
import React, { useState, useRef, useEffect, memo, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Watch, X, MapPin, Camera, EyeOff, Wrench, FileText, Map, Flag, Activity, GitMerge, Search, Sparkles, Users, LifeBuoy, TrendingUp, GraduationCap, BarChart3, Compass, Code, MessageSquare, Ruler } from 'lucide-react';
import { Project, WatchStory } from '../types';

// Cloudinary URL helper for optimized images
const optimizeCloudinaryUrl = (url: string): string => {
  // Add q_auto,f_auto for automatic quality and format optimization
  return url.replace('/upload/', '/upload/q_auto,f_auto/');
};

// Updated Data with Timeline Order and Watches
const projects: Project[] = [
  {
    id: '1',
    title: 'TikTok',
    category: 'Conversational AI chatbot',
    image: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764132458/tiktok_qjyhje.png'),
    year: '2025',
    watchYear: '2024-2025',
    description: "Bringing agentic AI to the fingertips of TikTok's global sales teams.",
    watches: [
      {
        brand: "Rolex",
        model: "Vintage Datejust Ref. 16220 (made in 1997)",
        purchaseLocation: "Acquired in Ginza, Tokyo",
        story: "Picked up during a cherry blossom trip to Japan in 2025, this watch marks the year I went all-in on AI and had the chance to join TikTok’s CRM AI initiative. It was also my wife’s second trimester and our official babymoon trip - another perfect reason for us to slow down, celebrate, and take one more trip together before life changed.",
        reason: "I was drawn to its vintage charm - the softly aged dial, crisp engine-turned bezel, and worn brown leather strap capture time not through perfection, but through the honest way a Rolex matures over decades.",
        mainImage: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764208014/24A5795_scntg1.webp"),
        galleryImage: { src: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764402677/591174871_1172813745054130_853516314962878981_n_bozwr0.jpg"), caption: "On the wrist with Toshi." }
      },
      {
        brand: "Seiko",
        model: "Prospex Alpinist SPB121 (brand new)",
        purchaseLocation: "Acquired at Haneda Airport, Tokyo",
        story: "This watch was a late-2024 purchase, right at the end of my first year at TikTok. We were in Japan to celebrate my wife's new job with our best friends during the peak of late autumn. Another excuse to visit Japan? Absolutely. I had my heart set on a Grand Seiko GMT SBGM221, but luck wasn't on my side and I couldn't find one in stock. Then, just as we were about to board our flight at Haneda, this Alpinist suddenly caught my eye...",
        reason: "I was drawn to the Alpinist's character - the rich green dial, warm gold markers, and brown leather strap evoke the feeling of well-worn trail maps and quiet mountain mornings, the same calm beauty I find in the forests and trails of my home in the Pacific Northwest.",
        mainImage: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764212614/post_7_10441_q0n0ax.jpg"),
        galleryImage: { src: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764232727/fd500a3e-b0e9-404d-b909-39bb59f270e9_vxwsom.jpg"), caption: "On the wrist with Toro." }
      }
    ],
    caseStudyData: {
      role: "Product design, Model design, Design strategy",
      product: "TikTok's internal CRM (SalesAlly)",
      team: "Design, PM, PMM, AI & Software Eng",
      content: [
        {
          id: 'overview',
          type: 'text',
          title: 'Overview',
          paragraphs: [
            "Internally called **3M – \"Make More Money\"**, TikTok's CRM is the platform that powers roughly **3,000 global sellers and sales leaders** every day. It's where commercial teams manage accounts, monitor campaign performance, and plan the next quarter of growth.",
            "In early 2025, I joined the CRM AI initiative as the *lead designer* for the vision, strategy, and MVP of TikTok's first flagship CRM AI Copilot – **SalesAlly**. Alongside 2 PMs, 2 PMMs, 3 AI engineers, and 8 software engineers, we shipped the 1.0 experience in roughly **three months**.",
            "This is the story of how the product went from *\"3M is a data graveyard\"* to *\"SalesAlly feels like having a really smart teammate.\"*"
          ]
        },
        {
          id: 'problems',
          type: 'list',
          title: 'The problems we set out to solve',
          style: 'cards',
          intro: "Before SalesAlly, three problems kept surfacing in every seller conversation:",
          items: [
            {
              label: "Sales inefficiency.",
              description: "Fragmented tools and manual processes delayed insight access, slowing pitch prep and eroding seller confidence.",
              icon: <Wrench size={24} />
            },
            {
              label: "Lack of strategic context.",
              description: "Insights lived in silos, without the strategic framing sellers needed to position TikTok and spot upsell opportunities.",
              icon: <EyeOff size={24} />
            },
            {
              label: "No team performance visibility.",
              description: "Sales leaders lacked a clear view into team performance, forcing reactive coaching instead of proactive management.",
              icon: <Activity size={24} />
            }
          ],
          conclusion: "One user summed it up bluntly: *\u201c3M is a data graveyard.\u201d* That quote became the north star for the work."
        },
        {
          id: 'opportunity',
          type: 'text',
          title: 'Market forces & opportunity',
          paragraphs: [
            "The sales enablement market is projected to grow at a **16.4% CAGR through 2035**, and the explosion of AI in enterprise tech is fundamentally reshaping how sellers work.",
            "TikTok had two unfair advantages to build on: **proprietary data** \u2013 the depth of first-party signals already inside 3M \u2013 and **compliance and security** \u2013 a mature foundation external AI tools simply couldn't match. Moving fast meant turning TikTok's biggest liability (data sprawl) into its strongest moat."
          ]
        },
        {
          id: 'vision',
          type: 'text',
          title: 'The vision',
          paragraphs: [
            "The vision framed AI not as a shortcut, but as a **force multiplier for the human craft of selling**. That framing shaped every downstream decision \u2013 from feature scope, to model behavior, to how the chat responses were designed."
          ]
        },
        {
          id: 'vision-visual',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1786660537/slide-012_bdzixv.png'),
          imageStyle: 'full',
          caption: 'The 2026 vision – an AI partner that amplifies every seller\u2019s relationship-building superpowers.'
        },
        {
          id: 'superpowers',
          type: 'list',
          title: 'One AI assistant, six superpowers',
          style: 'cards',
          intro: "We mapped the full end-to-end Sales IC journey and identified six areas where a copilot could compound seller impact:",
          items: [
            {
              label: "Outreach.",
              description: "AI-powered SDR: personalized email generation, cold-call scripts, and follow-up optimization.",
              icon: <Sparkles size={24} />
            },
            {
              label: "Client meeting assistance.",
              description: "Pre-meeting briefs, in-meeting nudges, and post-meeting summaries \u2013 so sellers walk in prepared and walk out with next steps.",
              icon: <Users size={24} />
            },
            {
              label: "Support & oncall.",
              description: "An always-on helpdesk for sales workflows, tooling questions, and policy lookups.",
              icon: <LifeBuoy size={24} />
            },
            {
              label: "Sales performance management.",
              description: "Team-level visibility, forecast diagnostics, and drill-downs for leaders to coach proactively.",
              icon: <TrendingUp size={24} />
            },
            {
              label: "Sales coach.",
              description: "Personalized coaching based on top-performer patterns and each seller's own history.",
              icon: <GraduationCap size={24} />
            },
            {
              label: "Data reporting.",
              description: "Natural-language reporting on revenue, pipeline, and account health \u2013 no more dashboard-hopping.",
              icon: <BarChart3 size={24} />
            }
          ]
        },
        {

          id: 'phase-1-strategy',
          type: 'text',
          title: 'Phase 1: A fast foundation',
          paragraphs: [
            "Six superpowers is a two-year story. To earn trust and momentum, we needed a **Phase 1 that shipped fast and felt useful on day one.**",
            "My strategy was to lead with a flagship **conversational copilot (SalesAlly)** \u2013 a single, unified surface where sellers could ask anything about their book of business \u2013 then complement it with **in-context AI features** wired directly into the existing 3M pages (Client 360, Sales Plans & Forecasts, Pitch Planner). We deliberately leaned on the existing AI design system to keep engineering focused on the reasoning quality, not the pixels."
          ]
        },
        {
          id: 'surface',
          type: 'text',
          title: 'Designing the Surface',
          paragraphs: [
            "The **Surface** is what sellers see and touch: the SalesAlly chat panel, the embedded assistant in Client 360, and the in-context *Ask AI / Diagnose / Drill-down / Summarize* actions on every revenue widget.",
            "We treated SalesAlly as a *teammate, not a tool.* That meant an opinionated welcome state with suggested prompts, streamed \u201canalyzing \u2192 reading references \u2192 generating response\u201d states to make the reasoning visible, inline references with source attribution on every claim, and one-tap actions to *iterate, expand, refine, or export* any response into a report, email, or meeting doc."
          ]
        },
        {
          id: 'surface-visual-hero',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1786660537/slide-005_ww1ecs.png'),
          imageStyle: 'full',
          caption: 'SalesAlly summarizing revenue performance in-context, alongside quick actions (Diagnose, Drill-down, Ask AI, Summarize) on every revenue widget.'
        },
        {
          id: 'surface-visual-client-360',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1786660537/slide-022_yvnmhy.png'),
          imageStyle: 'full',
          caption: 'In-context AI: an “Ask AI about this account” entry point right on the Client 360 header, opening a SalesAlly panel pre-scoped to the account.'
        },
        {
          id: 'surface-visual-states',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1786660537/slide-023_uvs67g.png'),
          imageStyle: 'full',
          caption: 'Response states: welcome with suggested prompts → streamed reasoning with reference reading → structured response with citations → one-tap hand-off to the right editor.'
        },
        {
          id: 'substrate-intro',
          type: 'text',
          title: 'The AI designer\u2019s new canvas',
          paragraphs: [
            "The biggest shift in my practice was realizing shipping a great AI product is not a surface problem. Borrowing a concept from **Suff Syed**, we designed the **Substrate** \u2013 the reasoning layer beneath the UI \u2013 as deliberately as we designed the pixels.",
            "**AI designers have the responsibility to shape the reasoning substrate so the surface can be trusted.** That principle rewired how the design, PM, and AI engineering pod worked together."
          ]
        },
        {
          id: 'substrate-visual',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1786660537/slide-031_r2eqwe.png'),
          imageStyle: 'full',
          caption: 'Surface vs. Substrate – what users see, and the reasoning layer designers now shape to create trust. (Concept from Suff Syed.)'
        },
        {
          id: 'substrate-artifacts',
          type: 'list',
          style: 'cards',
          intro: "In practice, these are the five artifacts I owned or co-authored for every SalesAlly capability:",
          items: [
            {
              label: "Intent matrix.",
              description: "A map of every job-to-be-done a seller might bring to SalesAlly, and which capability should respond.",
              icon: <Compass size={24} />
            },
            {
              label: "JSON schema.",
              description: "The structured contract between model and UI, so responses render predictably as summaries, tables, charts, or step-by-steps.",
              icon: <Code size={24} />
            },
            {
              label: "Markdown template.",
              description: "The response skeleton \u2013 headings, bullets, references, calls-to-action \u2013 that shapes how insight lands with the reader.",
              icon: <FileText size={24} />
            },
            {
              label: "Prompt spec.",
              description: "The system prompt and instructions that anchor tone, guardrails, and how SalesAlly reasons about ambiguous asks.",
              icon: <MessageSquare size={24} />
            },
            {
              label: "Eval rubric.",
              description: "The quantitative and qualitative dimensions \u2013 accuracy, clarity, actionability, trust \u2013 we grade every response against, release after release.",
              icon: <Ruler size={24} />
            }
          ]
        },
        {
          id: 'principles',
          type: 'list',
          title: 'Guiding principles',
          intro: "Three principles guided every design and model decision:",
          items: [
            "**Adaptability** \u2013 SalesAlly should meet sellers where they are, from a quick data lookup to a full account strategy.",
            "**Transparency** \u2013 Every response shows its work: the references it read, the confidence it has, and how the user can push back.",
            "**Trust by design** \u2013 Guardrails, disclaimers, and eval rubrics ship *with* the feature, not bolted on after launch."
          ]
        },
        {
          id: 'launch',
          type: 'text',
          title: 'Launch',
          paragraphs: [
            "SalesAlly 1.0 shipped in **September 2025** to all global sales regions and verticals \u2013 on time, and against the primary OKR of *\u226575% global adoption in one quarter.*"
          ]
        },
        {
          id: 'impact',
          type: 'stats',
          title: 'Post-launch impact',
          intro: "The Phase 1 launch beat every product KPI we set, and moved the needle on the workflows that mattered most:",
          items: [
            {
              value: "~52%",
              label: "Time savings on critical sales workflows",
              category: "Business",
              trend: 'up'
            },
            {
              value: "~80%",
              label: "SalesAlly global adoption",
              category: "Product",
              trend: 'up'
            },
            {
              value: "~89%",
              label: "SalesAlly global retention",
              category: "Product",
              trend: 'up'
            },
            {
              value: "4.8",
              label: "Avg. CSAT across AI features",
              category: "Experience"
            }
          ],
          conclusion: "Underneath the headline numbers, engagement stayed remarkably sticky: **~4 active days per user per week**, **~8 queries per user per week**, and a low **~16% regeneration rate** \u2013 sellers were getting a usable answer on the first try."
        },
        {
          id: 'ux-perception',
          type: 'stats',
          title: 'UX perception & actionability',
          intro: "We also tracked how SalesAlly *felt* to use, not just how often it was used:",
          items: [
            {
              value: "4.6 / 5",
              label: "Trust rating",
              category: "Experience"
            },
            {
              value: "4.8 / 5",
              label: "Clarity rating",
              category: "Experience"
            },
            {
              value: "4.8 / 5",
              label: "Actionability rating",
              category: "Experience"
            },
            {
              value: "~62% / ~54%",
              label: "Response copy & export rate (target 50%)",
              category: "Product",
              trend: 'up'
            }
          ],
          conclusion: "The one lowlight the team was actively working on: **time-to-value averaged ~160 seconds**, above the \u226490-second target. Streaming and faster tool-calls were flagged as the next big investments."
        },
        {
          id: 'validation',
          type: 'testimonial',
          title: 'Qualitative validation',
          intro: "Numbers tell one story; sellers tell the better one:",
          items: [
            {
              quote: "\u201cSalesAlly feels like having a really smart teammate...",
              body: "...it surfaces the right insights exactly when I need them, saving hours of manual digging.\u201d"
            },
            {
              quote: "\u201cInstead of switching between five dashboards...",
              body: "...I can just ask SalesAlly a question and get the full picture instantly. It\u2019s completely changed how I prep for client meetings.\u201d"
            },
            {
              quote: "\u201cWhat used to take half a day of analysis now takes minutes...",
              body: "...SalesAlly helps me focus on strategy and relationships instead of spreadsheets.\u201d"
            }
          ]
        },
        {
          id: 'whats-next',
          type: 'text',
          title: 'What\u2019s next',
          paragraphs: [
            "Phase 1 proved that a well-designed copilot could compress hours of work into minutes. Phase 2 was scoped to **mature SalesAlly from AI-assisted to AI-led** across every stage of the Sales IC journey \u2013 lead discovery, outreach, business monitoring, pitch planning, client engagement, and performance measurement."
          ]
        },
        {
          id: 'whats-next-visual',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1786660537/slide-054_ojrzut.png'),
          imageStyle: 'full',
          captionStyle: 'dark',
          caption: 'End-to-end Sales IC journey (2025 Q4) – the maturity model from limited AI → AI-assisted → AI-led across six stages of the sales cycle.'
        },
        {
          id: 'whats-next-outlook',
          type: 'text',
          paragraphs: [
            "At launch, most flows followed *AI suggests \u2192 human decides* and *AI drafts \u2192 human polishes.* Near-term, the roadmap called for *AI enhances materials \u2192 human approves;* long-term, an *AI-led model* where SalesAlly would handle routine execution end-to-end and humans would focus on judgment, relationships, and strategy.",
            "The next bets we set on the roadmap: **CRM AI on mobile** (meet sellers in the field), and a **unified intelligence layer** to share memory, context, and preferences across every AI feature in 3M."
          ]
        },
        {
          id: 'learning',
          type: 'text',
          title: 'What I learned',
          paragraphs: [
            "The biggest shift in my craft from this project: **designing AI is designing the reasoning substrate, not just the surface.** The pixels are the easy part. The intent matrix, the prompt spec, the eval rubric \u2013 that\u2019s where trust is engineered, and that\u2019s where designers now sit at the same table as PMs and AI engineers.",
            "SalesAlly also reminded me that a well-scoped Phase 1 is a strategy, not a compromise. Shipping something *useful and trusted* in three months bought us the runway \u2013 and the credibility \u2013 to go after the harder, agentic problems next."
          ]
        }
      ]
    }
  },
  {
    id: '3',
    title: 'Domino AI',
    category: 'MLOps',
    image: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764139578/domino_ivfaiz.png'),
    year: '2023',
    description: 'Managing environments on Domino AI Platform. A deep dive into the needs of data scientists.',
    watches: [
      {
        brand: "Rolex",
        model: "Vintage Oyster Perpetual Ref. 6558 (made in 1961)",
        purchaseLocation: "Acquired in Kyoto",
        story: "My first vintage luxury watch - and my first timepiece purchased in Japan, a country that truly celebrates vintage craft. I found this 1961 Oyster Perpetual as I was wrapping up my time at Domino AI and preparing for a big move to TikTok in 2023 - the same year ChatGPT ignited the modern AI revolution. A timeless watch marking a turning point in a very fast-moving year.",
        reason: "I picked up this Oyster Perpetual knowing it was made in 1961 - the same year my dad was born. There’s something grounding about wearing a watch that has quietly ticked through the same decades he has. Its clean, understated dial and gentle patina feel less like “vintage character” and more like time itself, carried forward in a way that reminds me of where my story began.",
        mainImage: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764211178/0014-54823_pnyxfq.webp"),
        galleryImage: { src: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764214645/cbee3c64-4c0c-4df4-9259-83d305593faf_ikyye0.jpg"), caption: "On the wrist with baby Tofu." }
      }
    ],
    caseStudyData: {
      role: "Product design & research",
      product: "Domino AI Platform",
      team: "Design, PM, and Eng",
      content: [
        {
          id: 'problem-breakdown',
          type: 'text',
          title: 'The problem',
          paragraphs: [
            "Environments in Domino are essentially abstracted Docker images - versioned, shareable templates that power every unit of execution on the platform. They’re central to reproducibility and collaboration.",
            "But the product experience around them wasn’t built for how users actually worked.",
            "Across customer conversations, the same patterns repeated: confusion, friction, and unnecessary complexity."
          ]
        },
        {
          id: 'insights',
          type: 'list',
          title: 'Research insights',
          intro: "Through user interviews and contextual inquiries, we understood that:",
          items: [
            "Users often didn’t know where to start. The existing product assumed users already knew exactly which environment they needed. Many didn’t. They needed the ability to browse, compare, and explore environments.",
            "The list view had almost no metadata or filtering, so browsing or comparing environments was basically impossible.",
            "The creation flow lived inside a cramped modal, which led to accidental environment creation and a very unclear mental model of “basic” vs. “advanced” configuration.",
            "requirements.txt / Conda-based setups were actually the most common workflow, yet the product treated them as “advanced.”",
            "Advanced users (Dockerfile) needed power tools, but they shouldn’t dominate the primary paths."
          ]
        },
        {
          id: 'deliverables',
          type: 'list',
          title: 'What I designed',
          style: 'numbered',
          items: [
            {
              label: "A better way to discover environments.",
              subItems: [
                "A real filtering system that lets users slice by configuration needs",
                "Richer metadata directly on the list view",
                "Quick-preview panels so users can understand an environment before diving in"
              ]
            },
            {
              label: "A modern, guided creation workflow.",
              subItems: [
                "Replaced the modal with a clear multi-step drawer that keeps users anchored",
                "Clean paths for: Simple Python-package setups, requirements.txt / Conda file–based configurations, and Dockerfile editing (intentionally secondary)",
                "Added syntax suggestions in the code editor to help users avoid errors",
                "Added a final review step so nothing gets created prematurely"
              ]
            }
          ]
        },
        // 15 Placeholder Images - with Cloudinary optimization
        { id: 'gallery-1', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764237937/new-global-environments_mba5rn.png'), caption: 'Environments landing page' },
        { id: 'gallery-2', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238120/new-filter-environments-1_dswhye.png'), caption: 'Filter environments' },
        { id: 'gallery-3', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238121/new-filter-environments-2_gc8ycs.png'), caption: 'Filter environments' },
        { id: 'gallery-4', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238120/new-filter-environments-10_njxrkw.png'), caption: 'Filter environments' },
        { id: 'gallery-5', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238120/new-filter-environments-applied_dvzok0.png'), caption: 'Filter environments' },
        { id: 'gallery-6', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238295/new-environment-quick-view-1_srdse4.png'), caption: 'Environments quick view' },
        { id: 'gallery-7', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238295/new-environment-quick-view-2_e4a9ei.png'), caption: 'Environments quick view' },
        { id: 'gallery-8', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238585/new-create-environment-2_rnzcnn.png'), caption: 'Create environment workflow' },
        { id: 'gallery-9', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238585/new-create-environment-4_hfpflt.png'), caption: 'Create environment workflow' },
        { id: 'gallery-10', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238586/new-create-environment-5_gxdxuw.png'), caption: 'Create environment workflow' },
        { id: 'gallery-11', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238586/new-create-environment-7_rhqvfa.png'), caption: 'Create environment workflow' },
        { id: 'gallery-12', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238586/new-create-environment-11_dtx171.png'), caption: 'Create environment workflow' },
        { id: 'gallery-13', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238587/new-create-environment-10_bi3pmu.png'), caption: 'Create environment workflow' },
        { id: 'gallery-14', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238587/new-create-environment-13_gyjqdf.png'), caption: 'Create environment workflow' },
        { id: 'gallery-15', type: 'image', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764238491/new-global-environment-details-created_blk3oa.png'), caption: 'New environment created' },

        {
          id: 'impact',
          type: 'list',
          title: 'Impact',
          items: [
            "Reduced accidental environment creation by **61%**, removing a major source of technical debt.",
            "Increased environment reuse by **35%** thanks to the new discovery experience.",
            "Decreased average configuration time by **~40%** for data scientists.",
            "Brought consistency and clarity through the new Domino Design System."
          ]
        },
        {
          id: 'learning',
          type: 'text',
          title: 'What I learned',
          paragraphs: [
            "Designing for data science workflows means embracing different levels of complexity without forcing users into one rigid path. The goal is to surface power when needed, hide it when not, and support exploration without breaking mental models."
          ]
        }
      ]
    }
  },
  {
    id: '2',
    title: 'Salesforce',
    category: 'Network Monitoring & Observability',
    image: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764132665/salesforce_zftcfi.png'),
    year: '2022',
    description: "Mulesoft's next-gen network monitoring experience. Simplifying complex topologies for DevOps engineers.",
    watches: [
      {
        brand: "Tudor",
        model: "Black Bay 58 (brand new)",
        purchaseLocation: "Acquired in Seattle, WA",
        story: "My first serious watch, bought as a wedding gift to myself. In 2022, Vietnam finally reopened after years of Covid lockdown, and I was grateful that my entire family stayed healthy. After so many delays, we finally got to have our wedding - and the Black Bay 58 became the watch that captured that moment.",
        reason: "I was drawn to its identity as a dive watch - the shimmering blue dial, classic bezel design, and the dependable, pressure-tested mechanics echo the depth and stillness of the ocean, one of my first loves in life.",
        mainImage: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764212522/Tudor-Black-Bay-58-Navy-Blue-by-WatchGecko7_txipxg.webp"),
        galleryImage: { src: optimizeCloudinaryUrl("https://res.cloudinary.com/dcc0zasye/image/upload/v1764212396/IMG_6516_vv5roy.jpg"), caption: "On the wrist for one of the most important days of my life." }
      }
    ],
    caseStudyData: {
      role: "Product design & research, Design strategy",
      product: "Anypoint Monitoring Platform",
      team: "Design, PM, Content, and Eng",
      content: [
        {
          id: 'overview',
          type: 'text',
          title: 'Overview',
          paragraphs: [
            "Mulesoft helps large enterprises integrate massive, scattered data systems. The original Anypoint Monitoring (1.0) wasn’t meeting business goals - users couldn’t see network-wide performance, troubleshooting was slow, and the product felt disconnected from the rest of the platform.",
            "My job was to redesign it so DevOps engineers could actually detect, investigate, and resolve issues effectively."
          ]
        },
        {
          id: 'problem',
          type: 'list',
          title: 'Key problems identified',
          style: 'cards',
          intro: "After interviews and contextual inquiries, two issues stood out:",
          items: [
            {
              label: "No network-level visibility.",
              description: "Anypoint Monitoring 1.0 only showed data after the user picked a single service. There was no top-level dashboard, no way to spot anomalies across the entire application network.",
              icon: <EyeOff size={24} />
            },
            {
              label: "Incomplete troubleshooting tools.",
              description: "DevOps needs metrics, logs, and traces. Anypoint Monitoring 1.0 only provided metrics and logs - and only for one service at a time.",
              icon: <Wrench size={24} />
            }
          ]
        },
        {
          id: 'problem-visual',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764403284/no-traces_hxqlz1.png'),
          imageStyle: 'full',
          caption: 'Current state - no traces data available for troubleshooting'
        },
        {
          id: 'problem-conclusion',
          type: 'text',
          paragraphs: [
            "These gaps directly impacted time to issue detection, identification, and resolution."
          ]
        },
        {
          id: 'deliverables',
          type: 'list',
          title: 'What I did',
          style: 'cards',
          intro: "I led workshops with PMs and engineers to re-think the experience from scratch. Three outputs aligned the team:",
          items: [
            {
              label: "Scenario storyboards",
              description: "For real-world detection + troubleshooting flows",
              icon: <FileText size={24} />
            },
            {
              label: "Cross-persona journey map",
              description: "Capturing how DevOps collaborates with SREs and architects",
              icon: <Map size={24} />
            },
            {
              label: "A North Star prototype",
              description: "Defined the future-state experience and got leadership buy-in.",
              icon: <Flag size={24} />
            }
          ],
          conclusion: "Once aligned, we focused on the highest-impact goal: *help DevOps engineers resolve issues faster.*"
        },
        {
          id: 'deliverables-journey',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764405902/journey_n7vctk.png'),
          imageStyle: 'full',
          caption: 'Cross-persona E2E journey map'
        },
        {
          id: 'deliverables-storyboard',
          type: 'image',
          src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764404699/storyboard_u99fs5.png'),
          imageStyle: 'full',
          caption: 'Scenario storyboards'
        },
        {
          id: 'solutions',
          type: 'list',
          title: 'The solution',
          style: 'cards',
          intro: "We defined and delivered three major pillars for Anypoint Monitoring 2.0:",
          items: [
            {
              label: "Network-level performance dashboard.",
              subItems: [
                "Real-time health of the entire application network",
                "Robust filters for drilling into problem areas quickly"
              ],
              icon: <Activity size={24} />
            },
            {
              label: "Full traces support across the network.",
              subItems: [
                "True distributed tracing",
                "Clear visibility into how issues propagate between services"
              ],
              icon: <GitMerge size={24} />
            },
            {
              label: "A redesigned Entity Details view.",
              subItems: [
                "Cleaner IA",
                "Easier access to logs, metrics, and traces",
                "Contextual insights into how each service impacts the wider network"
              ],
              icon: <Search size={24} />
            }
          ]
        },
        // 8 Gallery Images - with Cloudinary optimization
        { id: 'sf-gallery-1', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764312066/sfanypoint_1_oednsd.png'), caption: 'Network dashboard' },
        { id: 'sf-gallery-2', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373091/sfanypoint_22_rcmhbr.png'), caption: 'Network dashboard query filters' },
        { id: 'sf-gallery-3', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373090/sfanypoint_6_idlv1p.png'), caption: 'Entity details - Landing' },
        { id: 'sf-gallery-4', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373090/sfanypoint_6-1_vhcczk.png'), caption: 'Metric quick preview' },
        { id: 'sf-gallery-5', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373090/sfanypoint_6-2_f74yqg.png'), caption: 'Entity details - More metrics' },
        { id: 'sf-gallery-6', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373090/sfanypoint_7-1_rj7twz.png'), caption: 'Entity details - Traces' },
        { id: 'sf-gallery-7', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373090/sfanypoint_7-2_x7dy6h.png'), caption: 'Trace preview' },
        { id: 'sf-gallery-8', type: 'image', imageStyle: 'full', src: optimizeCloudinaryUrl('https://res.cloudinary.com/dcc0zasye/image/upload/v1764373090/sfanypoint_7_czefz6.png'), caption: 'Entity details - Logs' },
        {
          id: 'impact',
          type: 'stats',
          title: 'Impact',
          intro: "The redesign directly targeted the key business, product, and experience-level KPIs:",
          items: [
            {
              value: "Revenue",
              label: "Designs helped secured important contract renewals",
              category: "Business",
              trend: 'up'
            },
            {
              value: "~34%",
              label: "Reduction in avg. time to resolve an issue",
              category: "Product",
              trend: 'down'
            },
            {
              value: "~24%",
              label: "Increase in monthly active user rate",
              category: "Product",
              trend: 'up'
            },
            {
              value: "2 → 4.5",
              label: "Boosted avg. CSAT score significantly",
              category: "Experience"
            }
          ],
          conclusion: "Most importantly, the new design shifted Anypoint Monitoring from a single-entity tool to a **network-first, user-centered observability experience.**"
        },
        {
          id: 'validation',
          type: 'testimonial',
          title: 'Qualitative validation',
          intro: "For me, nevertheless, the best kind of validation is always the direct feedback coming from our users and customers. Many of whom told us that the redesigned experience truly made troubleshooting significantly faster and more intuitive for their teams.",
          items: [
            {
              quote: "“I love the flexibility of the Entities Search Query...",
              body: "...with the search query it’s so much easier for me to drill-down into my network and identify critical signals that can help me with my troubleshooting.”"
            },
            {
              quote: "“The product is aiding me debug a lot quicker...",
              body: "...by providing metrics and logs-level data right in-context of the apps & APIs I’m investigating. The UI visual signals are also a game-changer! These factors all really streamlined the workflow so I don’t have to keep digging around the system to gather such data.”"
            }
          ]
        },
        {
          id: 'contact-info',
          type: 'text',
          paragraphs: [
            "Please contact me directly for more deep dives into key success metrics!"
          ]
        }
      ]
    }
  }
];

interface ProjectsProps {
  onCaseStudyClick: (project: Project) => void;
}

// --- Components ---

const WatchDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  watches: WatchStory[] | undefined;
  year: string;
}> = ({ isOpen, onClose, watches, year }) => {
  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Use a portal to render outside the current stacking context (so it's above the Navbar)
  return createPortal(
    <AnimatePresence>
      {isOpen && watches && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90]"
          />

          {/* Drawer Container */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 z-[100] w-full md:w-[600px] bg-[#0f0f0f] border-l border-white/10 shadow-2xl flex flex-col overflow-hidden"
          >
            {/* Header / Close Button Area - Fixed at top */}
            <div className="absolute top-0 right-0 z-50 p-6 md:p-8">
              <button
                onClick={onClose}
                className="flex items-center justify-center p-3 bg-white/10 hover:bg-white text-white hover:text-black border border-white/20 transition-all duration-300 rounded-full shadow-lg group"
                aria-label="Close"
              >
                <X size={24} className="group-hover:rotate-90 transition-transform duration-300" />
              </button>
            </div>

            {/* Scrollable Content Area */}
            <div className="flex-1 overflow-y-auto w-full">
              <div className="px-8 md:px-12 pb-12 pt-6 md:pt-8"> {/* Adjusted padding to align with close button */}
                <div className="mb-12">
                  <span className="block text-secondary text-xs uppercase tracking-widest mb-4 mt-4"> {/* mt-4 to align with button center */}
                    Timepiece Collection
                  </span>
                  <h2 className="font-serif text-4xl md:text-5xl text-white font-bold tracking-tight">
                    {year}
                  </h2>
                </div>

                <div className="space-y-20">
                  {watches.map((watch, idx) => (
                    <div key={idx} className="group">
                      {/* Header */}
                      <div className="flex flex-col gap-2 mb-6">
                        <h3 className="text-2xl text-white font-medium">{watch.brand}</h3>
                        <p className="text-secondary text-lg font-serif italic">{watch.model}</p>
                      </div>

                      {/* Main Image */}
                      <div className="aspect-[4/3] w-full overflow-hidden rounded-sm mb-8 bg-surface">
                        <img
                          src={watch.mainImage}
                          alt={`${watch.brand} ${watch.model}`}
                          className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                          loading="lazy"
                        />
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-6 mb-8 text-xs uppercase tracking-widest text-secondary/70 border-b border-white/10 pb-6">
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {watch.purchaseLocation}
                        </div>
                      </div>

                      {/* Story */}
                      <div className="prose prose-invert max-w-none mb-8">
                        <p className="text-secondary leading-relaxed mb-4">
                          <span className="text-white font-medium block mb-1">The Story</span>
                          {watch.story}
                        </p>
                        <p className="text-secondary leading-relaxed">
                          <span className="text-white font-medium block mb-1">Why this watch?</span>
                          {watch.reason}
                        </p>
                      </div>

                      {/* Gallery Image (Single) */}
                      <div className="space-y-2">
                        <div className="aspect-[4/3] w-full overflow-hidden rounded-sm bg-surface">
                          <img
                            src={watch.galleryImage.src}
                            alt={watch.galleryImage.caption}
                            className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                            loading="lazy"
                          />
                        </div>
                        <p className="text-[10px] uppercase tracking-wider text-secondary/50 flex items-center gap-1">
                          <Camera size={10} />
                          {watch.galleryImage.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-20 pt-12 border-t border-white/5 text-center">
                  <p className="text-secondary/60 text-base italic font-serif">
                    "Time is the only true luxury."
                  </p>
                </div>

              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

// Individual Project Component - Memoized to prevent unnecessary re-renders
interface ProjectItemProps {
  project: Project;
  index: number;
  onCaseStudyClick: (p: Project) => void;
  onWatchClick: (p: Project) => void;
  setHoveredProject: (id: string | null) => void;
}

const ProjectItem = memo<ProjectItemProps>(({ project, index, onCaseStudyClick, onWatchClick, setHoveredProject }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isWatchHovered, setIsWatchHovered] = useState(false);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-5%", "5%"]);

  return (
    <div className="relative pl-8 md:pl-16">
      {/* Timeline Node - Adjusted top to align with year */}
      <div className="absolute left-[-5px] top-2 w-[9px] h-[9px] rounded-full bg-surface border border-secondary/50 z-20 group-hover:bg-white group-hover:border-white transition-colors duration-300"></div>

      <motion.div
        ref={ref}
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-10%" }}
        transition={{ duration: 0.8 }}
        className={`flex flex-col gap-6 cursor-pointer ${!isWatchHovered ? 'group' : ''}`}
        onMouseEnter={() => setHoveredProject(project.id)}
        onMouseLeave={() => setHoveredProject(null)}
        onClick={() => onCaseStudyClick(project)}
      >
        {/* Year Label - Timeline style - Clean */}
        <div className="flex items-center gap-4">
          <span className="font-mono text-sm text-secondary/70 group-hover:text-white transition-colors">
            {project.year}
          </span>
        </div>

        {/* Image Container */}
        <div className="w-full overflow-hidden rounded-sm bg-surface">
          <div className="relative overflow-hidden aspect-[16/10]">
            <motion.div style={{ y, scale: 1.05 }} className="w-full h-full relative">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
            </motion.div>
          </div>
        </div>

        {/* Content Info */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 md:gap-12 md:items-end">
          <div className="flex-1">
            <h3 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold mb-2 group-hover:text-white transition-colors duration-300">
              {project.title}
            </h3>
            <span className="text-xs uppercase tracking-widest text-secondary/70 mb-4 block">
              {project.category}
            </span>
            <p className="text-secondary/80 max-w-xl text-lg leading-relaxed font-light group-hover:text-secondary transition-colors duration-300">
              {project.description}
            </p>
          </div>

          <div className="flex flex-col items-end gap-6 shrink-0">
            {/* Primary Action: Case Study */}
            <div className="flex items-center gap-2 text-white border-b border-white/30 pb-1 group-hover:border-white transition-all duration-300">
              <span className="text-xs font-bold uppercase tracking-widest">See Case Study</span>
              <ArrowUpRight size={14} className="text-white transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </div>

            {/* Secondary Action: Timepieces - Subtle */}
            {project.watches && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onWatchClick(project);
                }}
                onMouseEnter={() => setIsWatchHovered(true)}
                onMouseLeave={() => setIsWatchHovered(false)}
                className="flex items-center gap-2 px-4 py-2 border border-white/20 rounded-sm hover:bg-white/10 transition-colors duration-300"
              >
                <Watch size={12} className="text-secondary" />
                <span className="text-[10px] uppercase tracking-widest text-secondary font-medium">
                  Timepieces of {project.watchYear || project.year}
                </span>
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
}, (prevProps, nextProps) => {
  // Custom comparison - only re-render if project data changes
  return prevProps.project.id === nextProps.project.id &&
         prevProps.index === nextProps.index;
});

const Projects: React.FC<ProjectsProps> = ({ onCaseStudyClick }) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);
  const [selectedWatchProject, setSelectedWatchProject] = useState<Project | null>(null);

  // Memoize callbacks to prevent unnecessary re-renders of ProjectItem
  const handleSetHoveredProject = useCallback((id: string | null) => {
    setHoveredProject(id);
  }, []);

  const handleWatchClick = useCallback((p: Project) => {
    setSelectedWatchProject(p);
  }, []);

  return (
    <section id="work" className="py-24 md:py-40 bg-transparent relative z-10">
      <div className="container mx-auto px-6 md:px-12 max-w-6xl">

        <div className="mb-20 md:mb-32">
          <h2 className="font-serif text-5xl md:text-7xl lg:text-8xl text-primary font-bold mb-8 tracking-tight">
            Sample work
          </h2>
          <p className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-light mb-6">
            A few selected projects where I tackled technical ambiguity and simplified complex workflows.
          </p>
          <p className="text-secondary text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            In addition to product & UX design, I'm also a big enthusiast for mechanical watches. <span className="text-white">Click on the "Timepieces" button under each case study to learn more about the special watches I bought during that year.</span>
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative border-l border-white/10 ml-4 md:ml-0 space-y-32 md:space-y-48">
          {projects.map((project, index) => (
            <ProjectItem
              key={project.id}
              project={project}
              index={index}
              onCaseStudyClick={onCaseStudyClick}
              onWatchClick={handleWatchClick}
              setHoveredProject={handleSetHoveredProject}
            />
          ))}
        </div>

        {/* Watch Details Overlay */}
        <WatchDrawer
          isOpen={!!selectedWatchProject}
          onClose={() => setSelectedWatchProject(null)}
          watches={selectedWatchProject?.watches}
          year={selectedWatchProject?.watchYear || selectedWatchProject?.year || ''}
        />

      </div>
    </section>
  );
};

export default Projects;