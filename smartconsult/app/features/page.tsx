'use client';

import { motion } from 'framer-motion';
import { AiMatchingForm } from '../components/features/ai-matching/AiMatchingForm';
import { ChatInterface } from '../components/features/chat/ChatInterface';
import { ReminderSystem } from '../components/features/reminders/ReminderSystem';
import { VoiceCommands } from '../components/features/voice/VoiceCommands';
import { SmartSuggestions } from '../components/features/suggestions/SmartSuggestions';
import { AutoScheduler } from '../components/features/scheduling/AutoScheduler';
import { VideoConsultation } from '../components/features/video/VideoConsultation';
import { DashboardLayout } from '../components/layout/DashboardLayout';
import { ProtectedRoute } from '../components/auth/ProtectedRoute';

export default function FeaturesPage() {
  return (
    <ProtectedRoute>
      <DashboardLayout>
        <div className="space-y-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl font-bold mb-4">Platform Features</h1>
            <p className="text-lg text-muted-foreground">
              Explore our comprehensive suite of smart healthcare consultation features
            </p>
          </div>

          <section className="space-y-12">
            {/* AI Matching */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h2 className="text-2xl font-semibold mb-6">AI Expert Matching</h2>
              <AiMatchingForm />
            </motion.div>

            {/* Instant Chat */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Instant Chat Support</h2>
              <ChatInterface />
            </motion.div>

            {/* Smart Reminders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Smart Reminders</h2>
              <ReminderSystem />
            </motion.div>

            {/* Voice Commands */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Voice Commands</h2>
              <VoiceCommands />
            </motion.div>

            {/* Smart Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Smart Suggestions</h2>
              <SmartSuggestions />
            </motion.div>

            {/* Auto Scheduler */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <h2 className="text-2xl font-semibold mb-6">Auto Scheduler</h2>
              <AutoScheduler />
            </motion.div>

            {/* Video Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-semibold mb-6">HD Video Consultation</h2>
              <VideoConsultation />
            </motion.div>
          </section>
        </div>
      </DashboardLayout>
    </ProtectedRoute>
  );
} 