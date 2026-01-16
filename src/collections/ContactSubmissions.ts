import { CollectionConfig } from 'payload';

const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['name', 'email', 'createdAt'],
  },
  access: {
    create: () => true, // Allow public form submissions
    read: ({ req: { user } }) => !!user, // Only admin can read
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'email',
      type: 'email',
      required: true,
    },
    {
      name: 'message',
      type: 'textarea',
      required: true,
    },
    {
      name: 'locale',
      type: 'select',
      defaultValue: 'en',
      options: [
        { label: 'English', value: 'en' },
        { label: 'Spanish', value: 'es' },
      ],
    },
  ],
};

export default ContactSubmissions;