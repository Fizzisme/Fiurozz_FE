/**
 * Contact details shown on the Contact Us page.
 *
 * Fill these with real values only. Anything left `null` or empty is hidden
 * from the page — never put a placeholder address here.
 */

export type ContactLink = {
    label: string;
    href: string;
};

export type TeamMember = {
    name: string;
    /** e.g. "Frontend", "Backend" — hidden when null. */
    role: string | null;
    links: ContactLink[];
};

export type ContactConfig = {
    /** Public inbox the composer opens a draft to. The form cannot send while this is null. */
    email: string | null;
    githubRepo: string;
    socials: ContactLink[];
    team: TeamMember[];
};

export const CONTACT: ContactConfig = {
    email: null,
    githubRepo: 'https://github.com/Fizzisme/WebFi_FE',
    socials: [],
    team: [
        { name: 'Nguyen Le Tuan Phi', role: null, links: [] },
        { name: 'Phan Dinh Phuc', role: null, links: [] },
    ],
};

export const githubIssuesUrl = `${CONTACT.githubRepo}/issues/new`;
