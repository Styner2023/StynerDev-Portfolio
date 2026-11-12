/**
 * Rating Components for Client Dashboard
 * 
 * Allows clients to rate developers and templates
 */

import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { useAddDeveloperRating, useAddTemplateRating } from '../../api/hooks/useDashboardContent';

interface RatingStarsProps {
  value: number;
  onChange: (value: number) => void;
  readonly?: boolean;
}

function RatingStars({ value, onChange, readonly = false }: RatingStarsProps) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => !readonly && onChange(star)}
          disabled={readonly}
          className={`text-3xl transition-all ${
            star <= value 
              ? 'text-yellow-400' 
              : 'text-gray-300 dark:text-gray-600'
          } ${!readonly && 'hover:text-yellow-300 cursor-pointer'}`}
        >
          ⭐
        </button>
      ))}
    </div>
  );
}

interface DeveloperRatingDialogProps {
  clientId: string;
  isOpen: boolean;
  onClose: () => void;
}

export function DeveloperRatingDialog({ clientId, isOpen, onClose }: DeveloperRatingDialogProps) {
  const [rating, setRating] = useState(5);
  const [communication, setCommunication] = useState(5);
  const [quality, setQuality] = useState(5);
  const [timeliness, setTimeliness] = useState(5);
  const [professionalism, setProfessionalism] = useState(5);
  const [feedback, setFeedback] = useState('');

  const addRating = useAddDeveloperRating(clientId);

  const handleSubmit = async () => {
    try {
      await addRating.mutateAsync({
        rating,
        categories: {
          communication,
          quality,
          timeliness,
          professionalism,
        },
        feedback,
      });
      
      // Reset form
      setRating(5);
      setCommunication(5);
      setQuality(5);
      setTimeliness(5);
      setProfessionalism(5);
      setFeedback('');
      
      onClose();
      alert('✅ Thank you for your feedback!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('❌ Failed to submit rating. Please try again.');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 shadow-2xl">
          <Dialog.Title className="text-3xl font-bold mb-6 text-text-light-primary dark:text-text-dark-primary flex items-center gap-3">
            <span className="material-icons text-primary text-4xl">star</span>
            Rate Your Developer
          </Dialog.Title>

          <div className="space-y-6">
            {/* Overall Rating */}
            <div>
              <label className="block font-semibold mb-3 text-lg">Overall Rating</label>
              <RatingStars value={rating} onChange={setRating} />
            </div>

            {/* Category Ratings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Detailed Ratings</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Communication</label>
                <RatingStars value={communication} onChange={setCommunication} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Work Quality</label>
                <RatingStars value={quality} onChange={setQuality} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Timeliness</label>
                <RatingStars value={timeliness} onChange={setTimeliness} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Professionalism</label>
                <RatingStars value={professionalism} onChange={setProfessionalism} />
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block font-semibold mb-3 text-lg">Additional Feedback (Optional)</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                placeholder="Share your thoughts about working with your developer..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={addRating.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-icons">send</span>
                {addRating.isPending ? 'Submitting...' : 'Submit Rating'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

interface TemplateRatingDialogProps {
  clientId: string;
  projectId: string;
  projectName: string;
  isOpen: boolean;
  onClose: () => void;
}

export function TemplateRatingDialog({ clientId, projectId, projectName, isOpen, onClose }: TemplateRatingDialogProps) {
  const [rating, setRating] = useState(5);
  const [design, setDesign] = useState(5);
  const [usability, setUsability] = useState(5);
  const [functionality, setFunctionality] = useState(5);
  const [responsiveness, setResponsiveness] = useState(5);
  const [feedback, setFeedback] = useState('');

  const addRating = useAddTemplateRating(clientId);

  const handleSubmit = async () => {
    try {
      await addRating.mutateAsync({
        projectId,
        rating,
        categories: {
          design,
          usability,
          functionality,
          responsiveness,
        },
        feedback,
      });
      
      // Reset form
      setRating(5);
      setDesign(5);
      setUsability(5);
      setFunctionality(5);
      setResponsiveness(5);
      setFeedback('');
      
      onClose();
      alert('✅ Thank you for rating the website design!');
    } catch (error) {
      console.error('Error submitting rating:', error);
      alert('❌ Failed to submit rating. Please try again.');
    }
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-900 rounded-2xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto z-50 shadow-2xl">
          <Dialog.Title className="text-3xl font-bold mb-6 text-text-light-primary dark:text-text-dark-primary flex items-center gap-3">
            <span className="material-icons text-primary text-4xl">palette</span>
            Rate Website: {projectName}
          </Dialog.Title>

          <div className="space-y-6">
            {/* Overall Rating */}
            <div>
              <label className="block font-semibold mb-3 text-lg">Overall Rating</label>
              <RatingStars value={rating} onChange={setRating} />
            </div>

            {/* Category Ratings */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Detailed Ratings</h3>
              
              <div>
                <label className="block text-sm font-medium mb-2">Design & Aesthetics</label>
                <RatingStars value={design} onChange={setDesign} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Usability & Navigation</label>
                <RatingStars value={usability} onChange={setUsability} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Functionality & Features</label>
                <RatingStars value={functionality} onChange={setFunctionality} />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Mobile Responsiveness</label>
                <RatingStars value={responsiveness} onChange={setResponsiveness} />
              </div>
            </div>

            {/* Feedback Text */}
            <div>
              <label className="block font-semibold mb-3 text-lg">Additional Feedback (Optional)</label>
              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                rows={4}
                placeholder="Share your thoughts about the website design and functionality..."
                className="w-full px-4 py-3 border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-primary/50 focus:border-primary dark:bg-gray-800 dark:text-white resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <button
                onClick={handleSubmit}
                disabled={addRating.isPending}
                className="flex-1 bg-gradient-to-r from-primary to-primary/80 text-white font-bold py-4 px-6 rounded-xl hover:shadow-xl transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span className="material-icons">send</span>
                {addRating.isPending ? 'Submitting...' : 'Submit Rating'}
              </button>
              <button
                onClick={onClose}
                className="px-6 py-4 border-2 border-gray-300 dark:border-gray-700 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-800 transition font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
