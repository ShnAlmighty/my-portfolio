'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, Github as GitHub, Linkedin as LinkedIn, MessageCircle, CheckCircle, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { Section, SectionTitle, Card, Button } from '../ui';
import { Form, Input, Textarea } from '../ui/Form';
import { personalInfo } from '@/data/personalInfo';

interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
}

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>('idle');

  // Validation functions
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    } else if (formData.name.trim().length < 2) {
      newErrors.name = 'Name must be at least 2 characters';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    } else if (formData.subject.trim().length < 5) {
      newErrors.subject = 'Subject must be at least 5 characters';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
    
    // Clear error when user starts typing
    if (errors[id as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [id]: undefined }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setStatus('sending');

    try {
      // EmailJS configuration (you'll need to set up EmailJS service)
      const templateParams = {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
        to_name: personalInfo.name,
      };

      // Note: You'll need to replace these with your actual EmailJS credentials
      // For now, we'll simulate the email sending
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Uncomment and configure when you have EmailJS set up:
      // await emailjs.send(
      //   'YOUR_SERVICE_ID',
      //   'YOUR_TEMPLATE_ID',
      //   templateParams,
      //   'YOUR_PUBLIC_KEY'
      // );

      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
      
      // Reset success message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    } catch (error) {
      console.error('Error sending email:', error);
      setStatus('error');
      
      // Reset error message after 5 seconds
      setTimeout(() => setStatus('idle'), 5000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <Section id="contact" className="bg-background-light">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <SectionTitle
          title="Get In Touch"
          subtitle="Let's discuss your next project or collaboration opportunity"
          align="center"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Information */}
          <motion.div variants={itemVariants}>
            <Card className="h-full">
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Let&apos;s Connect
              </h3>
              <p className="text-text-secondary mb-8 leading-relaxed">
                I&apos;m always interested in hearing about new opportunities, 
                whether that&apos;s a full-time role, consulting work, or just a chat 
                about technology. Feel free to reach out!
              </p>

              {/* Contact Details */}
              <div className="space-y-6 mb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-600/20 rounded-lg text-primary-500">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Email</p>
                    <a 
                      href={`mailto:${personalInfo.email}`}
                      className="text-text-secondary hover:text-primary-500 transition-colors"
                    >
                      {personalInfo.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-600/20 rounded-lg text-primary-500">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Phone</p>
                    <a 
                      href={`tel:${personalInfo.phone}`}
                      className="text-text-secondary hover:text-primary-500 transition-colors"
                    >
                      {personalInfo.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary-600/20 rounded-lg text-primary-500">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-text-primary font-medium">Location</p>
                    <p className="text-text-secondary">{personalInfo.location}</p>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h4 className="text-lg font-semibold text-text-primary mb-4">
                  Follow Me
                </h4>
                <div className="flex gap-4">
                  <a
                    href={personalInfo.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background hover:bg-background-light rounded-lg text-text-secondary hover:text-primary-500 transition-colors"
                    aria-label="GitHub"
                  >
                    <GitHub size={20} />
                  </a>
                  <a
                    href={personalInfo.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background hover:bg-background-light rounded-lg text-text-secondary hover:text-primary-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <LinkedIn size={20} />
                  </a>
                  <a
                    href={personalInfo.socialLinks.stackoverflow}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 bg-background hover:bg-background-light rounded-lg text-text-secondary hover:text-primary-500 transition-colors"
                    aria-label="Stack Overflow"
                  >
                    <MessageCircle size={20} />
                  </a>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={itemVariants}>
            <Card>
              <h3 className="text-2xl font-bold text-text-primary mb-6">
                Send a Message
              </h3>

              {/* Status Messages */}
              {status === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-green-500/20 text-green-500 rounded-lg mb-6"
                >
                  <CheckCircle size={20} />
                  <span>Message sent successfully! I&apos;ll get back to you soon.</span>
                </motion.div>
              )}

              {status === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-4 bg-red-500/20 text-red-500 rounded-lg mb-6"
                >
                  <AlertCircle size={20} />
                  <span>Failed to send message. Please try again or email me directly.</span>
                </motion.div>
              )}

              <Form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    id="name"
                    label="Name"
                    type="text"
                    placeholder="Your full name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={errors.name}
                    required
                    disabled={status === 'sending'}
                  />
                  <Input
                    id="email"
                    label="Email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={errors.email}
                    required
                    disabled={status === 'sending'}
                  />
                </div>

                <Input
                  id="subject"
                  label="Subject"
                  type="text"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleInputChange}
                  error={errors.subject}
                  required
                  disabled={status === 'sending'}
                />

                <Textarea
                  id="message"
                  label="Message"
                  placeholder="Tell me about your project or just say hello..."
                  value={formData.message}
                  onChange={handleInputChange}
                  error={errors.message}
                  rows={6}
                  required
                  disabled={status === 'sending'}
                />

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={status === 'sending'}
                  icon={status === 'sending' ? undefined : <Send size={20} />}
                >
                  {status === 'sending' ? 'Sending...' : 'Send Message'}
                </Button>
              </Form>
            </Card>
          </motion.div>
        </div>

        {/* Additional CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-text-secondary mb-6">
            Prefer a quick chat? Schedule a call or send me a direct message.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              href={`mailto:${personalInfo.email}?subject=Let's Connect`}
              variant="ghost"
              icon={<Mail size={20} />}
            >
              Email Directly
            </Button>
            <Button
              href={personalInfo.socialLinks.linkedin}
              variant="ghost"
              icon={<LinkedIn size={20} />}
              external
            >
              Connect on LinkedIn
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </Section>
  );
};

export default Contact;