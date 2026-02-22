"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  Code2,
  Braces,
  Database,
  Layout,
  Server,
  FileCode2,
  Lock,
  ArrowRight,
  Sparkles,
  Target,
  Zap,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { categories } from "@/data/dsa";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Layout,
  FileCode2,
  Braces,
  Code2,
  Server,
  Database,
  BookOpen,
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function DashboardPage() {
  return (
    <div className="min-h-[calc(100vh-3.5rem)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b bg-gradient-to-b from-primary/5 to-background">
        <div className="container mx-auto px-4 py-16 md:py-24 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-3xl mx-auto"
          >
            <Badge variant="secondary" className="mb-4">
              <Sparkles className="h-3 w-3 mr-1" />
              Free &amp; Open Source
            </Badge>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
              Interview{" "}
              <span className="text-primary">Handbook</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your complete guide to cracking technical interviews. Learn
              concepts, visualize algorithms, and practice coding — all in one
              place.
            </p>
            <div className="flex items-center justify-center">
              <Button asChild size="lg">
                <Link href="/dsa">
                  Start Learning DSA
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          <Card className="border-0 shadow-none bg-primary/5">
            <CardContent className="pt-6">
              <Target className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Simple Explanations</h3>
              <p className="text-sm text-muted-foreground">
                Every concept explained with real-life analogies and
                beginner-friendly language.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none bg-primary/5">
            <CardContent className="pt-6">
              <Zap className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Interactive Visualizations</h3>
              <p className="text-sm text-muted-foreground">
                Watch algorithms come alive with animated visualizations you
                can interact with.
              </p>
            </CardContent>
          </Card>
          <Card className="border-0 shadow-none bg-primary/5">
            <CardContent className="pt-6">
              <Code2 className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-semibold mb-1">Built-in Code Editor</h3>
              <p className="text-sm text-muted-foreground">
                Write, edit, and run JavaScript code directly in the browser
                with instant output.
              </p>
            </CardContent>
          </Card>
        </motion.div>

        <Separator className="mb-12" />

        {/* Categories */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold mb-2">Choose a Category</h2>
          <p className="text-muted-foreground">
            Select a topic to begin your preparation journey
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
        >
          {categories.map((category) => {
            const Icon = iconMap[category.icon] || BookOpen;

            return (
              <motion.div key={category.id} variants={item}>
                {category.available ? (
                  <Link href="/dsa">
                    <Card className="group cursor-pointer hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                      <div
                        className={`h-2 bg-gradient-to-r ${category.color}`}
                      />
                      <CardHeader className="pb-2">
                        <div className="flex items-start justify-between">
                          <div
                            className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center`}
                          >
                            <Icon className="h-5 w-5 text-white" />
                          </div>
                          <Badge variant="success" className="text-[10px]">
                            Available
                          </Badge>
                        </div>
                        <CardTitle className="text-lg mt-2">
                          {category.title}
                        </CardTitle>
                        <CardDescription className="text-xs">
                          {category.description}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-muted-foreground">
                            {category.topicCount} topics
                          </span>
                          <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ) : (
                  <Card className="relative overflow-hidden opacity-60">
                    <div
                      className={`h-2 bg-gradient-to-r ${category.color} opacity-50`}
                    />
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div
                          className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center opacity-50`}
                        >
                          <Icon className="h-5 w-5 text-white" />
                        </div>
                        <Badge variant="secondary" className="text-[10px]">
                          <Lock className="h-2.5 w-2.5 mr-1" />
                          Coming Soon
                        </Badge>
                      </div>
                      <CardTitle className="text-lg mt-2">
                        {category.title}
                      </CardTitle>
                      <CardDescription className="text-xs">
                        {category.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <span className="text-xs text-muted-foreground">
                        {category.topicCount} topics planned
                      </span>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Interview Handbook — Built for developers, by developers.
          </p>
        </div>
      </footer>
    </div>
  );
}
