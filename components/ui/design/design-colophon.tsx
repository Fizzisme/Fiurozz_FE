/** The colophon that closes the page. */
export function DesignColophon() {
    return (
        <footer
            data-ctr-tone="dark"
            className="grid gap-[0.7rem] border-t border-[rgba(237,229,211,0.14)] bg-ctr-ink px-[clamp(1.5rem,5vw,6rem)] pt-[clamp(3rem,6vw,5rem)] pb-[clamp(3rem,5vw,4rem)] text-[rgba(237,229,211,0.8)]"
        >
            <p className="text-[1.05rem] tracking-[0.24em] text-ctr-on-dark uppercase">Catronaut</p>
            <p className="italic">An AI design studio. Ideas in, real websites out.</p>
            <p className="mt-[0.6rem] max-w-[52ch] font-ctr-mono text-ctr-micro leading-[2] tracking-[0.1em] text-[rgba(237,229,211,0.66)] uppercase">
                Set in EB&nbsp;Garamond, Archivo and Courier&nbsp;Prime. Hero plate:{' '}
                <i>Fields under construction</i>. Archive pieces are illustrative samples made for
                this page.
            </p>
        </footer>
    );
}

export default DesignColophon;
