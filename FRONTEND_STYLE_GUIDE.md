# Altroway Frontend Enhancement Guide

## Color Palette

### Primary Colors
- **Blue**: #2563eb (for main actions, primary elements)
- **Indigo**: #4f46e5 (for accents and gradients)
- **Purple**: #7c3aed (for premium features)
- **Green**: #10b981 (for success, validation)
- **Orange**: #f97316 (for highlights, CTAs)

### Gradient Combinations
- **Primary Gradient**: from-blue-600 to-indigo-800
- **Premium Gradient**: from-purple-600 to-indigo-800
- **Success Gradient**: from-green-600 to-emerald-600
- **Warning Gradient**: from-orange-500 to-red-600

## Typography

### Headings
- **H1**: 3xl-5xl font-bold (Hero sections)
- **H2**: 2xl-4xl font-bold (Section titles)
- **H3**: lg-xl font-semibold (Card titles, subsections)
- **H4**: base-lg font-semibold (List items)

## Components

### Cards
- Use `rounded-2xl` for large radius
- Add `hover:shadow-xl transition-all` for interactive cards
- Use `border-2` for prominent borders
- Add gradient backgrounds: `bg-gradient-to-br`

### Buttons
- Large buttons: `size="lg"` with `px-12 py-6`
- Use gradient buttons for primary actions: `bg-gradient-to-r from-[color1] to-[color2]`
- Add hover effects: `hover:scale-105 transition-all`
- Round full buttons: `rounded-full`

### Badges
- Use for labels and categories
- Apply color schemes: `bg-[color]-100 text-[color]-800`
- Add icons for visual interest

### Input Fields
- Focus state: `focus:border-blue-500 focus:ring-blue-500`
- Border: `border-gray-300`
- Rounded: `rounded-lg`

## Spacing & Layout

### Container
- Use `container mx-auto px-4` for responsive padding
- Section padding: `py-16` or `py-20`
- Gap between grid items: `gap-6` or `gap-8`

### Cards
- Padding: `p-6` or `p-8`
- Header padding: Keep consistent with content
- Use `space-y-4` or `space-y-6` for vertical spacing

## Animations & Transitions

### Hover Effects
- Standard: `hover:shadow-lg transition-all`
- Scale up: `hover:scale-105`
- Scale down for buttons: `hover:scale-100` (from slightly larger)
- Color change: Add duration `duration-300`

### Loading States
- Use gradient skeletons
- Pulse animation for placeholders

## Icons

### Sizes
- Header/Hero: `h-16 w-16`
- Card header: `h-10 w-10`
- Inline: `h-4 w-4` or `h-5 w-5`
- Large buttons: `h-6 w-6`

### Usage
- Always pair with text or labels
- Use stroke-width: `stroke-2` for thin icons
- Use `text-[color]-600` for colored icons

## Responsive Design

### Breakpoints (Tailwind)
- Mobile: No prefix (0px)
- SM: `sm:` (640px)
- MD: `md:` (768px)
- LG: `lg:` (1024px)
- XL: `xl:` (1280px)

### Grid Layouts
- Mobile: `grid-cols-1`
- Tablet: `md:grid-cols-2`
- Desktop: `lg:grid-cols-3` or `lg:grid-cols-4`

## Page Structure

### All Pages Should Include
1. **Hero Section**
   - Gradient background
   - Clear heading
   - Descriptive subtitle
   - Optional: Badge with icon

2. **Main Content**
   - Use sections with alternating backgrounds
   - White and gray-50 alternation

3. **Call-to-Action Section**
   - Gradient background
   - Clear message
   - Prominent button

4. **Footer**
   - Always at the bottom
   - Use Footer component

## Accessibility

- Use semantic HTML
- Ensure color contrast (WCAG AA)
- Add alt text to images
- Use aria-labels where needed
- Test with keyboard navigation

## File Organization

All enhanced components should follow this pattern:
- Use `"use client"` for client components
- Import UI components from `@/components/ui/`
- Use Lucide icons from `lucide-react`
- Import Link from `next/link`
- Add Footer from `@/components/footer`

## Example Page Template

```tsx
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SomeIcon } from "lucide-react"
import Link from "next/link"

export default function PageName() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <Badge className="mb-4 text-blue-600 bg-white/90 px-4 py-2">
            <SomeIcon className="h-4 w-4 mr-2" />
            BADGE TEXT
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Page Title</h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Descriptive subtitle
          </p>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        {/* Content here */}
      </main>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-800 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Call to Action</h2>
          <Button size="lg" asChild>
            <Link href="/target">Action Button</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
```
