/**
 * ContactPage — branded shell around Sunrise's <ContactForm>.
 *
 * The form itself is covered by its own test; here we verify the page shell
 * renders it, shows the heading, and keeps no email address / mailto in source.
 *
 * @see components/app/marketing/contact-page.tsx
 */

import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import * as React from 'react';

// Stub the form so this test stays a shell test (the real form has its own).
const contactFormMock = vi.hoisted(() => vi.fn(() => null));
vi.mock('@/components/forms/contact-form', () => ({ ContactForm: contactFormMock }));

import ContactPage from '@/components/app/marketing/contact-page';

describe('ContactPage', () => {
  it('renders the branded shell and mounts the contact form', () => {
    render(React.createElement(ContactPage));

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Let’s build something/);
    expect(contactFormMock).toHaveBeenCalled();
  });

  it('exposes no email address / mailto in the page source', () => {
    const { container } = render(React.createElement(ContactPage));

    expect(container.innerHTML).not.toMatch(/mailto:/i);
  });
});
