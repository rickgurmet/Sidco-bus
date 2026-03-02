import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  CheckCircle2,
  Loader2,
  MessageSquare,
  MessageSquarePlus,
  Phone,
  RotateCcw,
  Star,
  User,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import PageLayout from "../components/layout/PageLayout";
import { useSubmitFeedback } from "../hooks/useQueries";

const RATING_LABELS = ["", "Poor", "Fair", "Good", "Great", "Excellent"];

export default function FeedbackPage() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { mutateAsync: submitFeedback, isPending } = useSubmitFeedback();

  const canSubmit = name.trim() && phone.trim() && rating > 0;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || isPending) return;

    try {
      await submitFeedback({
        name: name.trim(),
        phone: phone.trim(),
        rating,
        comment: comment.trim(),
      });
      setSubmitted(true);
      toast.success("Feedback submitted! Thank you for your review.");
    } catch {
      toast.error("Failed to submit feedback. Please try again.");
    }
  }

  function handleReset() {
    setName("");
    setPhone("");
    setRating(0);
    setHoverRating(0);
    setComment("");
    setSubmitted(false);
  }

  const displayRating = hoverRating || rating;

  return (
    <PageLayout showBack title="">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {/* Page header */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/20 flex items-center justify-center">
              <MessageSquarePlus
                className="w-5 h-5 text-primary"
                strokeWidth={2}
              />
            </div>
            <h1 className="font-display text-3xl font-extrabold text-foreground">
              Ride Feedback
            </h1>
          </div>
          <p className="text-muted-foreground">
            Tell us about your journey. Your feedback helps us improve.
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {submitted ? (
            /* Success state */
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              data-ocid="feedback.success_state"
              className="rounded-2xl border border-primary/30 bg-card p-8 sm:p-10 text-center"
            >
              {/* Success icon */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{
                  delay: 0.1,
                  type: "spring",
                  stiffness: 200,
                  damping: 15,
                }}
                className="w-20 h-20 rounded-full bg-primary/15 border-2 border-primary/30 flex items-center justify-center mx-auto mb-6"
              >
                <CheckCircle2 className="w-10 h-10 text-primary" />
              </motion.div>

              <h2 className="font-display text-2xl font-bold text-foreground mb-2">
                Thank you, {name}!
              </h2>
              <p className="text-muted-foreground mb-2">
                Your feedback has been submitted successfully.
              </p>

              {/* Star display */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`w-6 h-6 transition-colors ${
                      star <= rating
                        ? "fill-primary text-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
                <span className="ml-2 text-primary font-semibold">
                  {RATING_LABELS[rating]}
                </span>
              </div>

              <Button
                onClick={handleReset}
                variant="outline"
                className="border-border hover:border-primary/50 hover:bg-secondary"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Submit another feedback
              </Button>
            </motion.div>
          ) : (
            /* Feedback form */
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
            >
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl border border-border bg-card p-6 sm:p-8 space-y-6"
                noValidate
              >
                {/* Name */}
                <div className="space-y-2">
                  <Label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-primary" />
                    Full Name
                    <span className="text-destructive ml-0.5">*</span>
                  </Label>
                  <Input
                    id="name"
                    data-ocid="feedback.name_input"
                    type="text"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    autoComplete="name"
                    className="bg-secondary border-border h-11 focus:border-primary/50 focus:ring-primary/25 transition-colors placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label
                    htmlFor="phone"
                    className="text-sm font-semibold text-foreground flex items-center gap-1.5"
                  >
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    Phone Number
                    <span className="text-destructive ml-0.5">*</span>
                  </Label>
                  <Input
                    id="phone"
                    data-ocid="feedback.phone_input"
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    autoComplete="tel"
                    className="bg-secondary border-border h-11 focus:border-primary/50 focus:ring-primary/25 transition-colors placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Star Rating */}
                <div className="space-y-3">
                  <Label className="text-sm font-semibold text-foreground flex items-center gap-1.5">
                    <Star className="w-3.5 h-3.5 text-primary" />
                    Rate Your Ride
                    <span className="text-destructive ml-0.5">*</span>
                  </Label>

                  <div className="flex items-center gap-3">
                    <div
                      className="flex items-center gap-1.5"
                      aria-label="Rate your ride"
                    >
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          data-ocid={`feedback.rating.${star}`}
                          aria-pressed={rating === star}
                          aria-label={`${star} star${star > 1 ? "s" : ""} — ${RATING_LABELS[star]}`}
                          onClick={() => setRating(star)}
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onFocus={() => setHoverRating(star)}
                          onBlur={() => setHoverRating(0)}
                          className="group rounded-md p-1 transition-transform hover:scale-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        >
                          <Star
                            className={`w-8 h-8 transition-all duration-150 ${
                              star <= displayRating
                                ? "fill-primary text-primary scale-110"
                                : "text-muted-foreground group-hover:text-primary/50"
                            }`}
                          />
                        </button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      {displayRating > 0 && (
                        <motion.span
                          key={displayRating}
                          initial={{ opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.15 }}
                          className="text-sm font-semibold text-primary"
                        >
                          {RATING_LABELS[displayRating]}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>

                  {!rating && (
                    <p className="text-xs text-muted-foreground">
                      Click a star to rate your experience
                    </p>
                  )}
                </div>

                {/* Comments */}
                <div className="space-y-2">
                  <Label
                    htmlFor="comment"
                    className="text-sm font-semibold text-foreground flex items-center gap-1.5"
                  >
                    <MessageSquare className="w-3.5 h-3.5 text-primary" />
                    Comments
                    <span className="text-muted-foreground text-xs font-normal ml-1">
                      (optional)
                    </span>
                  </Label>
                  <Textarea
                    id="comment"
                    data-ocid="feedback.comment_textarea"
                    placeholder="Tell us about your experience — what went well, what could be improved..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    rows={4}
                    className="bg-secondary border-border focus:border-primary/50 focus:ring-primary/25 transition-colors resize-none placeholder:text-muted-foreground/60"
                  />
                </div>

                {/* Submit */}
                <div className="pt-2">
                  {isPending && (
                    <div
                      data-ocid="feedback.loading_state"
                      className="sr-only"
                      aria-live="polite"
                    >
                      Submitting your feedback...
                    </div>
                  )}
                  <Button
                    type="submit"
                    data-ocid="feedback.submit_button"
                    disabled={!canSubmit || isPending}
                    className="w-full h-12 bg-primary text-primary-foreground font-semibold text-base hover:bg-primary/90 disabled:opacity-50 transition-all"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Submitting...
                      </>
                    ) : (
                      <>
                        <MessageSquarePlus className="w-4 h-4 mr-2" />
                        Submit Feedback
                      </>
                    )}
                  </Button>

                  {!canSubmit && (
                    <p className="text-xs text-muted-foreground text-center mt-2">
                      Please fill in all required fields and select a rating.
                    </p>
                  )}
                </div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </PageLayout>
  );
}
