/// <reference types="unlighthouse" />
import { defineConfig } from 'unlighthouse'

export default defineConfig({
    // examplebtn-basic
    site: 'https://web.nostrada-kys.ru/',
    scanner: {
        include: [
            '/about',
            '/projects',
            '/guarantee',
            '/reviews',
            '/contact',
            '/vacancies',
            '/services',
            '/privacy-policy',
            '/built',
            '/stocks',
            '/blog',
            '/mortgage',
            '/zalupa',
        ],
        device: "desktop",
        samples: 1,
    },
    debug: true,
})