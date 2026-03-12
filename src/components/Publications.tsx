import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';
import { publications } from '@/data/portfolio';
import { FileText, ExternalLink, Award } from 'lucide-react';

export default function Publications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section id="publications" className="section-padding relative">
      <div className="container-max">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <span className="text-sm font-mono text-primary uppercase tracking-widest">
            06 — Publications
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Research Output
          </h2>
        </motion.div>

        <div className="space-y-6">
          {publications.map((pub, index) => (
            <motion.div
              key={pub.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group relative p-6 rounded-2xl glass-panel hover:border-primary/50 transition-all duration-300 hover-lift"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-xl bg-primary/10 shrink-0 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                  <FileText className="w-6 h-6 text-primary" />
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2 flex-wrap">
                    <h3 className="text-xl font-bold group-hover:text-gradient transition-all">
                      {pub.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 mb-3 flex-wrap">
                    <span className="text-primary font-medium">{pub.authors}</span>
                    <span className="text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{pub.venue}</span>
                    <span className="inline-flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                      <Award className="w-3 h-3" />
                      {pub.status}
                    </span>
                  </div>

                  <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                    {pub.description}
                  </p>

                  {pub.link && (
                    <a
                      href={pub.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-primary hover:underline transition-all"
                    >
                      <ExternalLink className="w-4 h-4" />
                      View Paper
                    </a>
                  )}
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
