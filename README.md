# Personal Site (GitHub Pages Ready)

This is a static portfolio site built from `sooraj-resume.pdf`.

## Run locally (WSL)

```bash
cd /home/electron377/Desktop/personal-site
python3 -m http.server 4173
```

Open `http://127.0.0.1:4173`.

## Deploy free on GitHub Pages

1. Create a GitHub repo and push this folder to the `main` branch.
2. In GitHub: `Settings -> Pages -> Source`, select `GitHub Actions`.
3. The included workflow at `.github/workflows/deploy-pages.yml` deploys automatically on push.
4. Your site will be available at:
   - `https://<your-username>.github.io/<repo-name>/` (project page), or
   - `https://<your-username>.github.io/` (if repo name is `<your-username>.github.io`).

## Notes

- Update contact/social links in `index.html` as needed.
- Resume download button links directly to `sooraj-resume.pdf` in the repo root.
