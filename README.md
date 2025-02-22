git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Bhima04/apollo.org.git
   git push -u origin main
   ```

2. Enable GitHub Pages
   - Go to your repository settings
   - Navigate to "Pages"
   - Select "GitHub Actions" as the source
   - Save the changes

3. Set up repository secrets
   - Go to repository settings
   - Navigate to "Secrets and variables" -> "Actions"
   - Add the following secrets:
     - `VITE_API_URL`: Your API endpoint URL
     - `OPENAI_API_KEY`: Your OpenAI API key
     - `GMAIL_USER`: Your Gmail address
     - `GMAIL_APP_PASSWORD`: Your Gmail app password

4. The GitHub Action will automatically build and deploy your site when you push to the main branch.

5. Custom Domain Setup (Optional)
   - Your site will be available at: `https://yourusername.github.io/hexacomm`
   - To use a custom domain:
     1. Go to repository settings -> Pages
     2. Under "Custom domain", enter your domain
     3. Click "Save"
     4. Add/Update your domain's DNS records:
        - Type: CNAME
        - Host: www or @
        - Value: yourusername.github.io
     5. Wait for DNS propagation (can take up to 24 hours)

## Development

To run the application locally:

1. Install dependencies
   ```bash
   npm install
   ```

2. Start the development server
   ```bash
   npm run dev
   ```

3. Build for production
   ```bash
   npm run build
