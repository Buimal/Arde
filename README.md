# Clandestine
Beauty salon landing page template made using [Next.js](https://nextjs.org/), [Perplexity](https://www.perplexity.ai/), and [Firebase Studio](https://firebase.studio/).

Check it out https://clandestine-beauty-salon-landing-page.netlify.app/

Successfully tested on Google Chrome 141 (Windows 11), Mozilla Firefox 136 (Fedora 42), and Safari (iPhone 7 - IOS 15.8.1)

# Notes
### General
- Content area max-width changes by `window.innerHeight`:
  - 1448px if ≥ 912px height
  - 1306px if ≤ 800px height

### Navbar
- Limelight section with icons is hidden if `window.innerWidth` is below the language-specific threshold defined in `Limelight.tsx` file.

### Hero Sections
- Two versions: desktop and tablet/mobile.  
- Desktop hero section:
  - One review container removed below a certain `windowWidth` threshold.
  - Text Swap container adjusts possessive adjectives to match Italian word gender.
  - For `heroSectionWidth < 1336px`, Text Swap component replaced with a modified morphing text resembling Hebrew Text Swap.
- Components with “Morphing” or “Morph” in their names don’t have a morphing effect—they use a morph-inspired blur effect that Perplexity AI created by combining two morphing text components, which is where the name comes from.
- Second review container (“Talia Lewin”) image mirrored for RTL layout.

### Currency Display
- English & Hebrew: currency symbol left of price, no space.
- Italian: symbol right of price, with space.

### Services Section  
- Mobile: lists all services vertically.
- Desktop:
  - Shows 4–6 services based on `window.innerHeight`:
    - ≥ 1048px → 6 services
    - ≥ 924px → 5 services
    - Else → 4 services
  - “Show More” button toggles service list with `animate.css` animations.
  - Background image behind service list.
  - “Show More” button color changes on hover of any service row.
- Hover effect (both desktop & mobile): highlight fields sequentially — name → description → price → duration.

### Masters Section
- The Fancy showcase component built on top of Aceternity UI’s Animated Testimonials is replaced with four cards on mobile.

### Testimonials Section
- Three versions: desktop, tablet, mobile.

### Booking Modal
#### Calendar
- Day headers:
  - English/Italian desktop: 3 characters
  - English/Italian mobile: 2 characters
  - Hebrew: always 2 characters (letter + geresh)
- Months can be changed via gestures.

### Checkout Tab
- To spare you from entering valid credit card information (and primarily to save myself time by avoiding the need to chat with the AI and implement a credit card validity check), I made the pay button enabled at all times so you can bypass this tab even if the input fields are empty.

### Hebrew AM/PM Variations  
- Short (time slots): לפ', אח'
- Medium (confirmation tab): לפנה"צ, אחה"צ
- Full (confirmation tab): לפני הצהריים, אחרי הצהריים

### Store Section
- Cards mirrored for RTL layout.

### About Us Section
- Desktop: diced image grid.
- Mobile: replaces grid with 2 images, then 1 image depending on `window.innerWidth`.

### FAQ
- Chevron rotation animation reversed for RTL direction flow.

### Footer
- Middle color in multi-colored text = accent color; other two colors derived via logic from [vue-color-wheel](https://vue-color-wheel.vercel.app/) by [Robert Shaw](https://github.com/xiaoluoboding).

# Credit
[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Limelight Nav](https://21st.dev/easemize/limelight-nav/default) by [EaseMize UI](https://21st.dev/easemize)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)

[React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Text Rotate](https://www.fancycomponents.dev/docs/components/text/text-rotate) by [Fancy Components](https://www.fancycomponents.dev/)

[GSAP (GreenSock Animation Platform)](https://www.npmjs.com/package/gsap)

[framer-motion](https://www.npmjs.com/package/framer-motion)

[motion](https://www.npmjs.com/package/motion)

[AnimateIcons](https://animateicons.vercel.app/)

[Hero Section 6](https://21st.dev/meschacirung/hero-section-6/default) by [Tailark](https://21st.dev/tailark)

[Modern Hero Section](https://21st.dev/ravikatiyar162/modern-hero-section/default) by [Ravi Katiyar](https://21st.dev/ravikatiyar)

[Travel section #tailwind #slick.js](https://codepen.io/kristen17/pen/bGxEqqj) by [Kristen](https://codepen.io/kristen17)

[Scroll Down Icon Animation](https://codepen.io/TKS31/pen/gOaKaxx) by [Tsukasa Aoki](https://codepen.io/TKS31)

[i18next](https://www.npmjs.com/package/i18next)

[Lucide React](https://www.npmjs.com/package/lucide-react)

[tabler-icons-react](https://www.npmjs.com/package/tabler-icons-react)

[Gooey Text Morphing](https://21st.dev/victorwelander/gooey-text-morphing/default) by [Victor Welander](https://21st.dev/victorwelander)

[Morphing Text](https://21st.dev/dillionverma/morphing-text/default) by [Magic UI](https://21st.dev/magicui)

[[gsap/component] ❍ Interactive Table with Image Hover & Idle Animation](https://codepen.io/filipz/pen/EaVNXmb) by [Filip Zrnzevic](https://codepen.io/filipz)

[Text scroll and hover effect with GSAP and clip](https://codepen.io/Juxtopposed/pen/mdQaNbG) by [Juxtopposed](https://codepen.io/Juxtopposed)

[Animate.css](https://github.com/animate-css/animate.css)

[Animated Testimonials](https://ui.aceternity.com/components/animated-testimonials) by [Aceternity UI](https://ui.aceternity.com/)

[Text Reveal Animation](https://codepen.io/swatiparge/pen/LYVMEag) by [Swati Parge](https://codepen.io/swatiparge)

[Bento Grid](https://ui.aceternity.com/components/bento-grid) by [Aceternity UI](https://ui.aceternity.com/)

[Lens](https://ui.aceternity.com/components/lens) by [Aceternity UI](https://ui.aceternity.com/)

[Profile Card Testimonial Carousel](https://21st.dev/arunachalam0606/profile-card-testimonial-carousel/default) by [Arunachalam](https://21st.dev/arunachalam0606)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Coach Scheduling Card](https://21st.dev/isaiahbjork/coach-scheduling-card/default) by [Isaiah](https://21st.dev/isaiahbjork)

[Calendar](https://21st.dev/designali-in/calendar/default) by [Ali Imam](https://21st.dev/dalim)

[react-swipeable](https://www.npmjs.com/package/react-swipeable)

[Cards with inverted border-radius #scss](https://codepen.io/kristen17/pen/pomgrKp) by [Kristen](https://codepen.io/kristen17)

[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)

[Success Check Animation Pure CSS](https://codepen.io/istiaktridip/pen/BZqaOd) by [Istiak Tridip](https://codepen.io/istiaktridip)

[Inverted border-radius using CSS mask II](https://codepen.io/t_afif/pen/LEPBYvK) by [Temani Afif](https://codepen.io/t_afif)

[Accordion](https://21st.dev/molecule-lab-rushil/accordion/default) by [Molecule UI](https://21st.dev/molecule-ui)

[JTB studios - Link](https://codepen.io/zzznicob/pen/GRPgKLM) by [Nico](https://codepen.io/zzznicob)

[Hover Link Animation](https://21st.dev/erikvalencia1/hover-link-animation/default) by [Ruben](https://21st.dev/rubenerik)

[Multi Colored Text with CSS](https://codepen.io/TajShireen/pen/YzZmbep) by [Shireen Taj](https://codepen.io/TajShireen)

[vue-color-wheel](https://vue-color-wheel.vercel.app/) by [Robert Shaw](https://github.com/xiaoluoboding)

[404 galaxy not found](https://codepen.io/remid/pen/YOVawm) by [Rémi Denimal](https://codepen.io/remid)

Photo by [Majid Akbari](https://unsplash.com/@majidakbaripic?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-white-sleeveless-top-O_M1eZ3FHmY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [engin akyurt](https://unsplash.com/@enginakyurt?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-blue-shirt-holding-her-hair-35NAaB_Nmx8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Farhad Ibrahimzade](https://unsplash.com/@ferhadd?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-woman-laying-on-top-of-a-bed-holding-a-hair-dryer-szpFxaqS658?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Giorgio Trovato](https://unsplash.com/@giorgiotrovato?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-woman-getting-her-nails-done-at-a-nail-salon-gb6gtiTZKB8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Arina Krasnikova](https://www.pexels.com/@arina-krasnikova/) from [Pexels](https://www.pexels.com/photo/a-woman-having-a-facial-treatment-6663373/)

Photo by [Ali Pazani](https://www.pexels.com/@alipazani/) from [Pexels](https://www.pexels.com/photo/woman-wearing-brown-fur-beanies-and-white-and-balck-top-2681751/)

Photo by [Le Petit](https://unsplash.com/@lepetit?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-with-white-hair-clip-Jp4POW00eE0?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Grzegorz Rakowski](https://unsplash.com/@gregory_rak?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-white-tank-top-qDJh1CayPTA?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Raamin ka](https://unsplash.com/@raaminka?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/woman-in-white-off-shoulder-dress-0f9et7fge84?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Bave Pictures](https://unsplash.com/@bavepictures?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-man-in-a-pink-suit-and-sunglasses-LWV_ki1Bxgo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Layanne Aguiar](https://www.pexels.com/@layanne-aguiar-500650789/) from [Pexels](https://www.pexels.com/photo/woman-in-braids-and-manicure-26933110/)

Photo by [Airam Dato-on](https://www.pexels.com/@airamdphoto/) from [Pexels](https://www.pexels.com/photo/woman-in-beige-shirt-leaning-on-chain-linked-fence-9637730/)

Photo by [Tnarg](https://www.pexels.com/@tnarg/) from [Pexels](https://www.pexels.com/photo/redhead-woman-posing-with-hand-in-hair-5131658/)

Photo by [Jonas Svidras](https://www.pexels.com/@jonas-svidras/) from [Pexels](https://www.pexels.com/photo/woman-wearing-black-spaghetti-strap-top-555787/)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-pump-soap-on-a-white-background-w319lp_rens?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-m-e-on-a-white-background-aehpQ9LtmTo?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-white-plastic-bottle-on-a-white-background-8SrO_OYe5D8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [KaLisa Veer](https://unsplash.com/@kalisaveer?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/red-pillar-candle-on-white-textile-Dk-If92Q7tY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/jar-of-jar-of-jar-of-jar-of-jar-of-jar-of-jar-of-jar-of-D0C7mQ3HM34?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Mockup Free](https://unsplash.com/@mockupfreenet?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-bottle-of-cbl-on-a-white-background-MqX0jSMYJC8?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Benyamin Bohlouli](https://unsplash.com/@benyamin_bohlouli?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-room-filled-with-furniture-and-a-large-window-_C-S7LqxHPw?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Guilherme Petri](https://unsplash.com/@guipetri?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/photo-of-saloon-interior-view-PtOfbGkU3uI?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Lindsay Cash](https://unsplash.com/@lindsayrc81?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-woman-getting-her-hair-cut-by-a-hair-stylist-Md_DhaFsnCQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)

Photo by [Edz Norton](https://unsplash.com/@edznorton?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash) on [Unsplash](https://unsplash.com/photos/a-variety-of-cosmetics-and-makeup-brushes-on-a-table-_nug8KZ8KUQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash)
