import { DashboardLayout } from './components/layout/DashboardLayout';
import { HeroSection } from './components/home/HeroSection';
import { QuickAccess } from './components/home/QuickAccess';
import { Categories } from './components/home/Categories';
import { BonusFeatures } from './components/home/BonusFeatures';
import { AnimatedContainer } from './components/client/AnimatedContainer';

export default function Home() {
  return (
    <DashboardLayout>
      <AnimatedContainer>
        <div>
          <HeroSection />
        </div>
        <div>
          <QuickAccess />
        </div>
        <div>
          <Categories />
        </div>
        <div>
          <BonusFeatures />
        </div>
      </AnimatedContainer>
    </DashboardLayout>
  );
}