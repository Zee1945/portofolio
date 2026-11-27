<script setup lang="ts">
import { profile } from '~/data/profile'

const asset = useAsset()
useHead({ link: [{ rel: 'icon', type: 'image/svg+xml', href: asset('/favicon.svg') }] })

const title = `${profile.name} — ${profile.role}`

useSeoMeta({
  title,
  description: profile.tagline,
  ogTitle: title,
  ogDescription: profile.tagline,
  ogType: 'website',
  twitterCard: 'summary_large_image',
})
</script>

<template>
  <a href="#main" class="skip-link">Skip to content</a>
  <SiteHeader />
  <main id="main">
    <HeroSection />
    <AboutSection />
    <ProjectsSection />
    <ExperienceSection />
    <ContactSection />
  </main>
  <SiteFooter />
  <ScrollTop />
</template>
