import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { HeroSection } from '@/app/components/home/HeroSection';
import { QuickAccess } from '@/app/components/home/QuickAccess';
import { Categories } from '@/app/components/home/Categories';
import { BonusFeatures } from '@/app/components/home/BonusFeatures';
import { ContactSection } from '@/app/components/home/ContactSection';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <HeroSection />
        <QuickAccess />
        <Categories />
        <BonusFeatures />
        <ContactSection />
      </div>
    </DashboardLayout>
  );
}