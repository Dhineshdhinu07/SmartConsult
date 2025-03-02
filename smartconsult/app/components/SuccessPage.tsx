'use client';

import { motion } from 'framer-motion';
import { CheckCircle2, Copy, Calendar } from 'lucide-react';
import { Button } from '@/app/components/ui/button';
import Link from 'next/link';

interface SuccessPageProps {
  amount: number;
  paymentId: string;
  bookedAt: string;
  meetingLink?: string;
  onCopyLink?: (link: string) => void;
}

export default function SuccessPage({
  amount,
  paymentId,
  bookedAt,
  meetingLink,
  onCopyLink
}: SuccessPageProps) {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-[#F8F9FA] to-white dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md p-6"
      >
        <div className="rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-lg border border-gray-100 dark:border-gray-700">
          <div className="text-center space-y-6">
            {/* Success Icon */}
            <div className="flex justify-center">
              <div className="rounded-full bg-green-100 dark:bg-green-900/30 p-3">
                <CheckCircle2 className="h-12 w-12 text-green-500 dark:text-green-400" />
              </div>
            </div>

            {/* Success Message */}
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Booking Confirmed!
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                Your consultation has been successfully booked
              </p>
            </div>

            {/* Booking Details */}
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-900/50 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Amount Paid</span>
                  <span className="font-semibold text-gray-900 dark:text-white">
                    ₹{amount}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Payment ID</span>
                  <span className="font-mono text-sm text-gray-900 dark:text-white">
                    {paymentId}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-400">Booked On</span>
                  <span className="text-gray-900 dark:text-white">{bookedAt}</span>
                </div>
              </div>

              {meetingLink && (
                <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-blue-500 dark:text-blue-400" />
                      <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                        Meeting Link
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onCopyLink?.(meetingLink)}
                      className="hover:bg-blue-100 dark:hover:bg-blue-900/50"
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="mt-2 text-sm text-blue-600 dark:text-blue-300 break-all">
                    {meetingLink}
                  </p>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-3">
              <Button asChild>
                <Link href="/dashboard">
                  Go to Dashboard
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/bookings">
                  View All Bookings
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 