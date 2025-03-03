
import { useEffect, useState, useRef } from 'react';
import { CheckCircle, ArrowRight, Cpu, Zap, FileSearch, Settings, BarChart, Rocket } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, useAnimation, AnimatePresence } from 'framer-motion';

interface Step {
  title: string;
  description: string;
  icon: React.ReactNode;
  details: string[];
  color: string;
}

const steps: Step[] = [
  {
    title: 'Select Your Models',
    description: 'Browse our extensive collection of AI models, and select the ones that fit your needs.',
    icon: <FileSearch className="w-8 h-8" />,
    color: 'from-blue-500/20 to-blue-600/20',
    details: [
      'Access over 500+ pre-trained AI models from leading providers',
      'Filter by task type, performance metrics, or licensing options',
      'Preview model capabilities with sample inputs before adding to your pipeline',
      'Import custom models from Hugging Face or your own repositories'
    ]
  },
  {
    title: 'Design Your Pipeline',
    description: 'Drag and drop models onto the canvas and connect them to create your custom workflow.',
    icon: <Settings className="w-8 h-8" />,
    color: 'from-violet-500/20 to-purple-600/20',
    details: [
      'Intuitive drag-and-drop interface with real-time connections',
      'Configure each model with parameters specific to your use case',
      'Add conditional logic, loops, and parallel processing paths',
      'Save pipeline templates for reuse across projects'
    ]
  },
  {
    title: 'Test & Refine',
    description: 'Test your pipeline with sample data and refine it until it works exactly as you need.',
    icon: <BarChart className="w-8 h-8" />,
    color: 'from-emerald-500/20 to-green-600/20',
    details: [
      'Run tests on small data samples to verify pipeline behavior',
      'Visualize performance metrics and identify bottlenecks',
      'A/B test different model configurations to optimize results',
      'Automatic error detection and suggested fixes'
    ]
  },
  {
    title: 'Deploy & Scale',
    description: "Once you're satisfied, deploy your pipeline to production with a single click.",
    icon: <Rocket className="w-8 h-8" />,
    color: 'from-orange-500/20 to-red-600/20',
    details: [
      'One-click deployment to cloud infrastructure or on-premises',
      'Auto-scaling based on workload demands and traffic patterns',
      'Comprehensive monitoring dashboards and alerts',
      'Version control and rollback capabilities for safe updates'
    ]
  }
];

const HowItWorks = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const autoPlayIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const controls = useAnimation();
  
  useEffect(() => {
    // Start autoplay on mount
    if (isAutoPlaying) {
      autoPlayIntervalRef.current = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % steps.length);
      }, 6000);
    }
    
    return () => {
      if (autoPlayIntervalRef.current) {
        clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [isAutoPlaying]);
  
  useEffect(() => {
    // Animate on index change
    controls.start({
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, type: "spring", stiffness: 100 }
    });
  }, [activeIndex, controls]);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
    if (autoPlayIntervalRef.current) {
      clearInterval(autoPlayIntervalRef.current);
      autoPlayIntervalRef.current = null;
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const detailVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2 + i * 0.1,
        duration: 0.4
      }
    })
  };

  const iconVariants = {
    initial: { scale: 0.8, rotate: -10 },
    animate: { 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20,
        duration: 1.5
      }
    },
    hover: { 
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  const StepIcon = ({ icon, isActive, color }: { icon: React.ReactNode, isActive: boolean, color: string }) => (
    <motion.div
      variants={iconVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      className={`relative p-6 rounded-2xl bg-gradient-to-br ${color} backdrop-blur-lg
                  shadow-[0_0_15px_rgba(0,0,0,0.1)] border border-white/10 dark:border-white/5
                  flex items-center justify-center z-10`}
    >
      <div className="text-foreground dark:text-white">
        {icon}
      </div>
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-2xl opacity-40"
          initial={{ opacity: 0 }}
          animate={{ 
            opacity: [0.2, 0.5, 0.2],
            boxShadow: [
              '0 0 0 0 rgba(255,255,255,0.1)', 
              '0 0 20px 5px rgba(255,255,255,0.2)', 
              '0 0 0 0 rgba(255,255,255,0.1)'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      )}
    </motion.div>
  );

  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.02] dark:opacity-[0.05] animate-pulse"></div>
      
      {/* Futuristic background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-1/4 left-0 w-1/3 h-1/2 bg-gradient-to-r from-primary/10 to-transparent blur-3xl rounded-full"
          animate={{ 
            x: [0, 20, 0],
            opacity: [0.3, 0.5, 0.3] 
          }}
          transition={{ 
            duration: 15, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-10 w-1/3 h-1/3 bg-gradient-to-l from-secondary/10 to-transparent blur-3xl rounded-full"
          animate={{ 
            x: [0, -30, 0],
            opacity: [0.2, 0.4, 0.2] 
          }}
          transition={{ 
            duration: 18, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      <div className="container px-6 mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold mb-4">How Piper Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building AI pipelines has never been easier. Follow these simple steps to create your own custom AI workflow.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-12 gap-10">
          <div className="md:col-span-4 space-y-6 order-2 md:order-1">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className={`neo-card p-6 cursor-pointer transition-all border backdrop-blur-md
                            ${activeIndex === index 
                              ? 'bg-gradient-to-r from-background to-background/40 border-primary/50 shadow-glow' 
                              : 'bg-background/30 border-border hover:border-border/80'
                            }`}
                onClick={() => {
                  setActiveIndex(index);
                  setIsAutoPlaying(false);
                  if (autoPlayIntervalRef.current) {
                    clearInterval(autoPlayIntervalRef.current);
                    autoPlayIntervalRef.current = null;
                  }
                }}
              >
                <div className="flex items-start gap-4">
                  <motion.div 
                    animate={activeIndex === index ? { 
                      scale: [1, 1.1, 1], 
                      rotate: [0, 5, 0, -5, 0],
                      transition: { duration: 0.5 }
                    } : { scale: 1 }}
                  >
                    {step.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-medium text-lg mb-1">{step.title}</h3>
                    <p className="text-sm text-muted-foreground">{step.description}</p>
                  </div>
                </div>
                
                {/* Progress indicator for active card */}
                {activeIndex === index && isAutoPlaying && (
                  <div className="mt-4 h-1 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-primary"
                      initial={{ width: "0%" }}
                      animate={{ width: "100%" }}
                      transition={{ duration: 6, ease: "linear" }}
                    />
                  </div>
                )}
              </motion.div>
            ))}
            
            <div className="flex justify-center mt-6">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleAutoPlay}
                className="flex items-center gap-2"
              >
                {isAutoPlaying ? (
                  <>
                    <span>Pause</span>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Zap className="h-4 w-4" />
                    </motion.div>
                  </>
                ) : (
                  <>
                    <span>Auto Play</span>
                    <Cpu className="h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="md:col-span-8 order-1 md:order-2">
            <div className="h-[500px] neo-card flex items-center justify-center p-10 relative overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeIndex}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0 w-full h-full flex items-center justify-center p-8"
                >
                  <div className="text-center relative z-10">
                    <StepIcon 
                      icon={steps[activeIndex].icon} 
                      isActive={true}
                      color={steps[activeIndex].color}
                    />
                    
                    <motion.h3 
                      className="text-2xl font-bold my-6"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    >
                      {steps[activeIndex].title}
                    </motion.h3>
                    
                    <div className="flex flex-col gap-4 max-w-lg mx-auto text-left">
                      {steps[activeIndex].details.map((detail, i) => (
                        <motion.div 
                          key={i} 
                          custom={i}
                          variants={detailVariants}
                          initial="hidden"
                          animate="visible"
                          className="flex items-start gap-2"
                        >
                          <CheckCircle className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                          <p>{detail}</p>
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6, duration: 0.4 }}
                      className="mt-8"
                    >
                      <Button size="sm" variant="outline" className="rounded-full">
                        Learn More <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </motion.div>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Futuristic circuit/connection patterns in the background */}
              <div className="absolute inset-0 opacity-5 pointer-events-none">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                  <pattern id="circuit-pattern" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
                    <path d="M20 10 H80 V90 H20 Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    <circle cx="20" cy="10" r="2" fill="currentColor" />
                    <circle cx="80" cy="10" r="2" fill="currentColor" />
                    <circle cx="80" cy="90" r="2" fill="currentColor" />
                    <circle cx="20" cy="90" r="2" fill="currentColor" />
                    <path d="M20 50 H80" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    <path d="M50 10 V90" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                    <circle cx="50" cy="50" r="3" fill="currentColor" />
                  </pattern>
                  <rect x="0" y="0" width="100%" height="100%" fill="url(#circuit-pattern)" />
                </svg>
              </div>

              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {steps.map((_, index) => (
                  <button
                    key={index}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      activeIndex === index 
                        ? 'bg-primary w-8' 
                        : 'bg-muted-foreground/30'
                    }`}
                    onClick={() => {
                      setActiveIndex(index);
                      setIsAutoPlaying(false);
                      if (autoPlayIntervalRef.current) {
                        clearInterval(autoPlayIntervalRef.current);
                        autoPlayIntervalRef.current = null;
                      }
                    }}
                    aria-label={`Go to step ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
