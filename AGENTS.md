<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep ASSEMBLE as a single anchored event microsite at `/`; its sections form one cinematic narrative and share local interaction state.
- Keep event pass creation entirely client-side and explicitly marked preview-only; official event registration details are not yet available.
- Keep official artwork slots in `src/lib/artwork.ts` empty until authorized assets are supplied; abstract CSS fallbacks avoid character lookalikes and copyright uncertainty.
