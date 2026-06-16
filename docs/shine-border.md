---
title: Shine Border
date: 2024-05-25
description: Shine border is an animated background border effect.
author: unnamed-lab
published: true
---

<ComponentPreview name="shine-border-demo" />

## Installation

<Tabs defaultValue="cli">

<TabsList>
  <TabsTrigger value="cli">CLI</TabsTrigger>
  <TabsTrigger value="manual">Manual</TabsTrigger>
</TabsList>
<TabsContent value="cli">

```bash
npx shadcn@latest add @magicui/shine-border
```

</TabsContent>

<TabsContent value="manual">

<Steps>

<Step>Copy and paste the following code into your project.</Step>

```tsx
"use client"

import * as React from "react"

import { cn } from "@/lib/utils"

interface ShineBorderProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Width of the border in pixels
   * @default 1
   */
  borderWidth?: number
  /**
   * Duration of the animation in seconds
   * @default 14
   */
  duration?: number
  /**
   * Color of the border, can be a single color or an array of colors
   * @default "#000000"
   */
  shineColor?: string | string[]
}

/**
 * Shine Border
 *
 * An animated background border effect component with configurable properties.
 */
export function ShineBorder({
  borderWidth = 1,
  duration = 14,
  shineColor = "#000000",
  className,
  style,
  ...props
}: ShineBorderProps) {
  return (
    <div
      style={
        {
          "--border-width": `${borderWidth}px`,
          "--duration": `${duration}s`,
          backgroundImage: `radial-gradient(transparent,transparent, ${
            Array.isArray(shineColor) ? shineColor.join(",") : shineColor
          },transparent,transparent)`,
          backgroundSize: "300% 300%",
          mask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMask: `linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)`,
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          padding: "var(--border-width)",
          ...style,
        } as React.CSSProperties
      }
      className={cn(
        "motion-safe:animate-shine pointer-events-none absolute inset-0 size-full rounded-[inherit] will-change-[background-position]",
        className
      )}
      {...props}
    />
  )
}

```

<Step>Update the import paths to match your project setup.</Step>

<Step>Add the required CSS animations</Step>

Add the following animations to your global CSS file.

```css title="app/globals.css" showLineNumbers {2, 4-14}
@theme inline {
  --animate-shine: shine var(--duration) infinite linear;

  @keyframes shine {
    0% {
      background-position: 0% 0%;
    }
    50% {
      background-position: 100% 100%;
    }
    to {
      background-position: 0% 0%;
    }
  }
}
```

</Steps>

</TabsContent>

</Tabs>

## Examples

### Monotone

<ComponentPreview name="shine-border-demo-2" />

## Usage

```tsx showLineNumbers
import { ShineBorder } from "@/components/ui/shine-border"
```

```tsx showLineNumbers
<div className="relative h-[500px] w-full overflow-hidden">
  <ShineBorder />
</div>
```

## Props

| Prop          | Type                  | Default     | Description                                                         |
| ------------- | --------------------- | ----------- | ------------------------------------------------------------------- |
| `className`   | `string`              | `-`         | The class name to be applied to the component.                      |
| `duration`    | `number`              | `14`        | Defines the animation duration to be applied on the shining border. |
| `shineColor`  | `string \| string[]`  | `"#000000"` | Color of the border, can be a single color or an array of colors.   |
| `borderWidth` | `number`              | `1`         | Width of the border in pixels.                                      |
| `style`       | `React.CSSProperties` | `-`         | Additional styles to be applied to the component.                   |
