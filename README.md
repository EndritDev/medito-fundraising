_**MEDITO FUNRAISING ONE-PAGE WEBSITE**_
A lightweight, responsible and versatile one-pager for all kinds of fundraising initiatives by medito.
Thoroughly commented, so you just need to read through the code to understand and modify the website.

**Title and Description:**
  - A clear and adjustable title that can be set to reflect the current fundraising goal
  - A brief description that contextualizes the fundraising initiative. Also customizable of course.

**Fundraising Progress Indicator:**
  - Displays dynamically the amount raised towards the goal (dummy data, but can be replaced by an API endpoint).
  - Visually represents progress in both numerical value and percentage.
  - animated progress bar that activates upon page load.
  - 
**Interactive Q&A Dropdowns:**
  - Customizable questions
  - Dropdowns to reveal answers for each question.
  - The final dropdown to contains an inline form asking for the user's email address to prevent spam and allow for follow-up queries.

**Donation Section:**
  - An input field for donors to specify an amount, with validation to ensure it's a legitimate figure.
  - Integration with Stripe checkout for secure transactions, with support for multiple currencies possible
  - A donation button that is prominently displayed and accessible.
    
**Rewards for Donors:**
  - A flexible rewards section where incentives can be outlined based on donation tiers.

**Dynamic Notification Bar:**
  - A notification feature at the top of the page that showcases recent donations.
  - The ability to connect this feature to an API endpoint, allowing for real-time updates at specified intervals.
    
**Design and Hosting Requirements:**
  - The design is responsive, ensuring functionality across all devices.
  - The page has a clean, modern aesthetic that can be easily changed for various campaigns.
  - The code is be optimized for hosting on Cloudflare Pages.

**Development and Deployment:**
  - The site structure allows for easy content updates for different campaigns.
  - The codebase is maintainable.
  - All forms include appropriate validation checks, including spam prevention mechanisms.
