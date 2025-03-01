import { DashboardLayout } from '@/app/components/layout/DashboardLayout';
import { HeroSection } from '@/app/components/home/HeroSection';
import { QuickAccess } from '@/app/components/home/QuickAccess';
import { Categories } from '@/app/components/home/Categories';
import { BonusFeatures } from '@/app/components/home/BonusFeatures';

export default function Home() {
  return (
    <DashboardLayout>
      <div className="space-y-8">
        <HeroSection />
        <QuickAccess />
        <Categories />
        <BonusFeatures />
      </div>
    </DashboardLayout>
  );
}