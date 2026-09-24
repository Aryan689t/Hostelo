import React, { useState } from 'react';
import {
  Utensils,
  Star,
  Clock,
  Flame,
  ChevronDown,
  ChevronUp,
  ShieldCheck,
  Send,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import type { DayOfWeek } from '../types';
import { Card, CardHeader } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const MessPage: React.FC = () => {
  const { messMenu, regulations, feedbacks, addMessFeedback } = useHostelo();

  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [activeMealType, setActiveMealType] = useState<'Breakfast' | 'Lunch' | 'Snacks' | 'Dinner'>('Dinner');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState<string>('');
  const [expandedReg, setExpandedReg] = useState<string | null>('reg-1');

  const days: DayOfWeek[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const currentDayMenu = messMenu.find((m) => m.day === selectedDay) || messMenu[0];

  const handleRatingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessFeedback(activeMealType, rating, comment);
    setComment('');
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-5xl mx-auto pb-16">
      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">HOSTEL MESS & CATERING</Badge>
            <span className="text-xs text-slate-400 font-mono">Cleanliness Audit: 4.8/5.0 ★</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Weekly Dining Timetable
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            Nutritious, high-protein 4-meal daily menu prepared in central commercial kitchen.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-blue-50/60 p-2.5 rounded-xl border border-blue-200/80">
          <Utensils className="w-5 h-5 text-blue-600 shrink-0" />
          <div className="text-left text-xs">
            <p className="font-bold text-blue-950">Zero Food Wastage Mission</p>
            <p className="text-[10px] text-blue-700">Take only what you eat</p>
          </div>
        </div>
      </div>

      {/* Day Selector Navigation Pills */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {days.map((day) => {
          const isSelected = selectedDay === day;
          return (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all duration-150 cursor-pointer ${
                isSelected
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:bg-slate-50'
              }`}
            >
              {day}
            </button>
          );
        })}
      </div>

      {/* 4-Meal Menu Card Grid for Selected Day */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Breakfast */}
        <Card className="border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Breakfast</span>
              {currentDayMenu.breakfast.special && (
                <Badge variant="purple" size="sm">{currentDayMenu.breakfast.special}</Badge>
              )}
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentDayMenu.breakfast.timing}
            </span>
          </div>
          <div className="py-4">
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {currentDayMenu.breakfast.menu}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              {currentDayMenu.breakfast.calories}
            </span>
            <span className="text-[11px] text-slate-400">Tea / Milk included</span>
          </div>
        </Card>

        {/* Lunch */}
        <Card className="border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Lunch</span>
              {currentDayMenu.lunch.special && (
                <Badge variant="primary" size="sm">{currentDayMenu.lunch.special}</Badge>
              )}
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentDayMenu.lunch.timing}
            </span>
          </div>
          <div className="py-4">
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {currentDayMenu.lunch.menu}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              {currentDayMenu.lunch.calories}
            </span>
            <span className="text-[11px] text-slate-400">Unlimited Phulkas & Rice</span>
          </div>
        </Card>

        {/* Snacks */}
        <Card className="border-slate-200">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-900">Evening Snacks & Chai</span>
              {currentDayMenu.snacks.special && (
                <Badge variant="warning" size="sm">{currentDayMenu.snacks.special}</Badge>
              )}
            </div>
            <span className="text-xs font-mono text-slate-400 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentDayMenu.snacks.timing}
            </span>
          </div>
          <div className="py-4">
            <p className="text-sm font-semibold text-slate-800 leading-relaxed">
              {currentDayMenu.snacks.menu}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              {currentDayMenu.snacks.calories}
            </span>
            <span className="text-[11px] text-slate-400">Freshly prepared at 5 PM</span>
          </div>
        </Card>

        {/* Dinner */}
        <Card className="border-blue-200 bg-linear-to-b from-blue-50/20 to-white">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-900">Dinner</span>
              {currentDayMenu.dinner.special && (
                <Badge variant="primary" size="sm">{currentDayMenu.dinner.special}</Badge>
              )}
            </div>
            <span className="text-xs font-mono text-blue-700 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {currentDayMenu.dinner.timing}
            </span>
          </div>
          <div className="py-4">
            <p className="text-sm font-semibold text-slate-900 leading-relaxed">
              {currentDayMenu.dinner.menu}
            </p>
          </div>
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
            <span className="flex items-center gap-1 font-mono text-slate-700">
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              {currentDayMenu.dinner.calories}
            </span>
            <span className="text-[11px] font-semibold text-blue-600">Dessert Included</span>
          </div>
        </Card>
      </div>

      {/* Interactive Rate Today's Meal & Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader
            title="Rate Today's Meal & Submit Feedback"
            subtitle="Your direct rating guides chef kitchen improvements"
            icon={<Star className="w-5 h-5 text-amber-500" />}
          />

          <form onSubmit={handleRatingSubmit} className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              {(['Breakfast', 'Lunch', 'Snacks', 'Dinner'] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setActiveMealType(m)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                    activeMealType === m
                      ? 'bg-[#0F172A] text-white'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            {/* Star Rating Select */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Food Quality & Taste (1 to 5 Stars)
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 rounded-lg hover:scale-110 transition-transform cursor-pointer"
                  >
                    <Star
                      className={`w-7 h-7 ${
                        star <= rating
                          ? 'text-amber-400 fill-amber-400'
                          : 'text-slate-300'
                      }`}
                    />
                  </button>
                ))}
                <span className="text-xs font-mono font-bold text-slate-700 ml-2">
                  {rating === 5 ? 'Excellent ⭐️' : rating === 4 ? 'Good' : rating === 3 ? 'Average' : 'Needs Improvement'}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-600 mb-1.5">
                Remarks / Chef Suggestions
              </label>
              <input
                type="text"
                placeholder="e.g. Paneer gravy was delicious, tea could be a bit stronger..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3.5 py-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>

            <Button type="submit" variant="primary" size="sm" icon={Send}>
              Submit Meal Rating
            </Button>
          </form>
        </Card>

        {/* Live Student Feedbacks */}
        <Card>
          <CardHeader
            title="Recent Mess Ratings"
            subtitle="Student reviews from today"
          />

          <div className="space-y-3 max-h-56 overflow-y-auto no-scrollbar">
            {feedbacks.map((fb) => (
              <div key={fb.id} className="p-3 rounded-lg bg-slate-50 border border-slate-200/70 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{fb.mealType}</span>
                  <div className="flex items-center gap-0.5 text-amber-500">
                    {Array.from({ length: fb.rating }).map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
                <p className="text-slate-600">{fb.comment}</p>
                <p className="text-[10px] text-slate-400 font-mono">By {fb.studentName} • {fb.timestamp}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Mess Regulations Accordion */}
      <Card>
        <CardHeader
          title="Hostel Mess Regulations & Code of Conduct"
          subtitle="Mandatory guidelines for all hostel residents"
          icon={<ShieldCheck className="w-5 h-5" />}
        />

        <div className="divide-y divide-slate-100">
          {regulations.map((reg) => {
            const isExpanded = expandedReg === reg.id;
            return (
              <div key={reg.id} className="py-3">
                <button
                  onClick={() => setExpandedReg(isExpanded ? null : reg.id)}
                  className="w-full flex items-center justify-between text-left font-semibold text-sm text-slate-900 hover:text-blue-600 transition-colors cursor-pointer py-1"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>{reg.title}</span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-slate-400" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400" />
                  )}
                </button>

                {isExpanded && (
                  <div className="mt-2 pl-4 pr-2 space-y-1.5 animate-fade-in text-xs text-slate-600">
                    {reg.timings && (
                      <p className="font-mono text-blue-600 font-medium mb-1">{reg.timings}</p>
                    )}
                    {reg.points.map((pt, idx) => (
                      <p key={idx} className="leading-relaxed flex items-start gap-2">
                        <span className="text-slate-400">•</span>
                        <span>{pt}</span>
                      </p>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
};
