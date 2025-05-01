import User from "../models/User.js"
import { Webhook } from 'svix';

export const clerkWebhooks = async (req, res) => {
    const payload = JSON.stringify(req.body);
    const headers = {
        "svix-id": req.headers["svix-id"],
        "svix-timestamp": req.headers["svix-timestamp"],
        "svix-signature": req.headers["svix-signature"]
    };

    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    try {
        whook.verify(payload, headers);
    } catch (err) {
        console.error('Webhook verification failed', err);
        return res.status(400).json({});
    }

    const { data, type } = req.body;

    try {
        switch (type) {
            case 'user.created': {
                const primaryEmail = data.email_addresses?.find(
                    email => email.id === data.primary_email_address_id
                )?.email_address;

                if (!primaryEmail) {
                    console.error('No primary email found for user:', data.id);
                    return res.status(400).json({});
                }

                const userData = {
                    _id: data.id, // Ensure you are setting the _id correctly
                    email: primaryEmail,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url,
                };

                console.log('Attempting to save user data:', userData);

                try {
                    const newUser = await User.create(userData);
                    console.log('User created successfully in database:', newUser);
                    return res.json({}); // Send a success response after saving
                } catch (error) {
                    console.error('Error creating user in database:', error);
                    return res.status(500).json({ success: false, message: 'Failed to save user data' });
                }
                break;
            }

            case 'user.updated': {
                const primaryEmail = data.email_addresses?.find(
                    email => email.id === data.primary_email_address_id
                )?.email_address;

                const userData = {
                    email: primaryEmail,
                    name: `${data.first_name || ''} ${data.last_name || ''}`.trim(),
                    image: data.image_url,
                };

                try {
                    const updatedUser = await User.findByIdAndUpdate(data.id, userData);
                    console.log('User updated in database:', updatedUser);
                    return res.json({}); // Send a success response
                } catch (error) {
                    console.error('Error updating user in database:', error);
                    return res.status(500).json({ success: false, message: 'Failed to update user data' });
                }
                break;
            }

            case 'user.deleted': {
                try {
                    const deletedUser = await User.findByIdAndDelete(data.id);
                    console.log('User deleted from database:', deletedUser);
                    return res.json({}); // Send a success response
                } catch (error) {
                    console.error('Error deleting user from database:', error);
                    return res.status(500).json({ success: false, message: 'Failed to delete user data' });
                }
                break;
            }

            default:
                console.log('Unhandled webhook type:', type);
                return res.json({}); // Send a default success response for unhandled types
        }
    } catch (error) {
        console.error('Webhook processing error:', error);
        return res.status(500).json({ success: false, message: 'Webhook processing failed' });
    }
};