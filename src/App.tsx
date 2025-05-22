import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import LoadingSpinner from './components/ui/LoadingSpinner';
import ErrorBoundary from './components/ErrorBoundary';

// Import pages directly to avoid lazy loading issues for core pages
import HomePage from './pages/HomePage';
import LearnPage from './pages/LearnPage';
import ContentPage from './pages/ContentPage';
import UserProfilePage from './pages/UserProfilePage';
import RewardsPage from './pages/RewardsPage';
import AudioLibraryPage from './pages/AudioLibraryPage';
import QuizPage from './pages/QuizPage';
import UnifiedAILearningPath from './pages/UnifiedAILearningPath';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import NotFoundPage from './pages/NotFoundPage';

// Lazy load less frequently accessed pages
const AboutPage = lazy(() => import('./pages/AboutPage'));
const OfflinePage = lazy(() => import('./pages/OfflinePage'));
const SearchResultsPage = lazy(() => import('./pages/SearchResultsPage'));
const CourseDetailPage = lazy(() => import('./pages/CourseDetailPage'));
const PhysicsPage = lazy(() => import('./pages/SubjectPages/PhysicsPage'));
const ChemistryPage = lazy(() => import('./pages/SubjectPages/ChemistryPage'));
const BiologyPage = lazy(() => import('./pages/SubjectPages/BiologyPage'));
const MathematicsPage = lazy(() =>
  import('./pages/SubjectPages/MathematicsPage')
);
const BanglaPage = lazy(() => import('./pages/SubjectPages/BanglaPage'));
const EnglishPage = lazy(() => import('./pages/SubjectPages/EnglishPage'));
const ReligionPage = lazy(() => import('./pages/SubjectPages/ReligionPage'));
const ArabicPage = lazy(() => import('./pages/SubjectPages/ArabicPage'));
const GeneralSciencePage = lazy(() =>
  import('./pages/SubjectPages/GeneralSciencePage')
);

function App() {
  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-50 to-purple-50">
          <Header />
          <main className="flex-grow">
            <Suspense
              fallback={
                <div className="flex items-center justify-center py-20">
                  <LoadingSpinner />
                </div>
              }
            >
              <ErrorBoundary>
                <Routes>
                  {/* Core routes */}
                  <Route path="/" element={<HomePage />} />
                  <Route path="/content" element={<ContentPage />} />
                  <Route path="/profile" element={<UserProfilePage />} />
                  <Route path="/learn" element={<LearnPage />} />
                  <Route path="/rewards" element={<RewardsPage />} />
                  <Route path="/audio-library" element={<AudioLibraryPage />} />
                  <Route path="/quiz" element={<QuizPage />} />
                  <Route path="/article/:name" element={<ArticlePage />} />
                  <Route path="/articleslist" element={<ArticlesListPage />} />

                  {/* Unified AI Learning Path */}
                  <Route
                    path="/ai-learning"
                    element={
                      <ErrorBoundary>
                        <UnifiedAILearningPath />
                      </ErrorBoundary>
                    }
                  />

                  {/* Redirect old routes to the new unified page */}
                  <Route
                    path="/ai-education"
                    element={<UnifiedAILearningPath />}
                  />
                  <Route
                    path="/ai-shikha"
                    element={<UnifiedAILearningPath />}
                  />
                  <Route path="/ai-qa" element={<UnifiedAILearningPath />} />
                  <Route
                    path="/learning-paths"
                    element={<UnifiedAILearningPath />}
                  />

                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/offline" element={<OfflinePage />} />

                  {/* Search Results Page */}
                  <Route path="/search" element={<SearchResultsPage />} />

                  {/* Course Detail Page */}
                  <Route
                    path="/course/:courseId"
                    element={<CourseDetailPage />}
                  />

                  {/* Subject Routes */}
                  <Route path="/subjects/physics" element={<PhysicsPage />} />
                  <Route
                    path="/subjects/chemistry"
                    element={<ChemistryPage />}
                  />
                  <Route path="/subjects/biology" element={<BiologyPage />} />
                  <Route
                    path="/subjects/mathematics"
                    element={<MathematicsPage />}
                  />
                  <Route path="/subjects/bangla" element={<BanglaPage />} />
                  <Route path="/subjects/english" element={<EnglishPage />} />
                  <Route path="/subjects/religion" element={<ReligionPage />} />
                  <Route path="/subjects/arabic" element={<ArabicPage />} />
                  <Route
                    path="/subjects/general-science"
                    element={<GeneralSciencePage />}
                  />

                  {/* 404 Route - Must be last */}
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </ErrorBoundary>
            </Suspense>
          </main>
          <Footer />
        </div>
      </Router>
    </ErrorBoundary>
  );
}

export default App;
