import React, { useState } from 'react';
import {
  Vote,
  CheckCircle2,
  Clock,
  Archive,
  Award,
} from 'lucide-react';
import { useHostelo } from '../context/HosteloContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';

export const VotingPage: React.FC = () => {
  const { polls, castVote, showToast } = useHostelo();
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});

  const activePolls = polls.filter((p) => p.status === 'active');
  const completedPolls = polls.filter((p) => p.status === 'completed');

  const handleVoteSubmit = (pollId: string) => {
    const selected = selectedOptions[pollId];
    if (!selected) {
      showToast('Please pick an option to vote', 'info');
      return;
    }
    castVote(pollId, selected);
  };

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl mx-auto pb-16">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" size="sm">HOSTEL DEMOCRACY</Badge>
            <span className="text-xs text-slate-400 font-mono">1 Student = 1 Vote</span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            Democratic Hostel Voting
          </h2>
          <p className="text-xs text-slate-500 mt-1 max-w-xl">
            Cast your vote on upcoming mess menu themes, common room upgrades, and hostel policy revisions. All results update in real-time.
          </p>
        </div>

        <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center shrink-0">
          <p className="text-[10px] uppercase font-bold text-slate-400">Total Polls</p>
          <p className="text-xl font-extrabold text-slate-900 font-mono mt-0.5">{polls.length}</p>
        </div>
      </div>

      {/* Active Polls Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
            <span>Active Hostel Polls ({activePolls.length})</span>
          </h3>
          <span className="text-xs text-slate-500">Live participation</span>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {activePolls.map((poll) => {
            const hasVoted = Boolean(poll.userVotedOptionId);
            const currentSelected = selectedOptions[poll.id] || poll.userVotedOptionId;

            return (
              <Card key={poll.id} className="border-blue-100/90 shadow-sm space-y-4">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <Badge variant="primary" size="sm">{poll.category}</Badge>
                    {poll.highlightBadge && (
                      <Badge variant="purple" size="sm">{poll.highlightBadge}</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>Expires {poll.expiresAt}</span>
                  </div>
                </div>

                {/* Poll Info */}
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{poll.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{poll.description}</p>
                </div>

                {/* Options List */}
                <div className="space-y-3 pt-1">
                  {poll.options.map((option) => {
                    const percentage =
                      poll.totalVotes > 0 ? Math.round((option.votes / poll.totalVotes) * 100) : 0;
                    const isSelected = currentSelected === option.id;
                    const isUserVote = poll.userVotedOptionId === option.id;

                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          if (!hasVoted) {
                            setSelectedOptions((prev) => ({ ...prev, [poll.id]: option.id }));
                          }
                        }}
                        className={`p-4 rounded-xl border transition-all ${
                          isUserVote
                            ? 'bg-blue-50/90 border-blue-400 shadow-xs'
                            : isSelected && !hasVoted
                            ? 'bg-blue-50/50 border-blue-300'
                            : hasVoted
                            ? 'bg-slate-50/60 border-slate-200'
                            : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-blue-50/20 cursor-pointer'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                                isSelected || isUserVote
                                  ? 'border-blue-600 bg-blue-600 text-white'
                                  : 'border-slate-300 bg-white'
                              }`}
                            >
                              {(isSelected || isUserVote) && (
                                <div className="w-1.5 h-1.5 bg-white rounded-full" />
                              )}
                            </div>
                            <span className="text-xs sm:text-sm font-semibold text-slate-800">
                              {option.label}
                            </span>
                          </div>

                          <div className="text-right shrink-0">
                            <span className="text-xs sm:text-sm font-extrabold font-mono text-slate-900">
                              {percentage}%
                            </span>
                            <span className="text-[11px] text-slate-400 font-mono ml-1.5">
                              ({option.votes} votes)
                            </span>
                          </div>
                        </div>

                        {/* Animated Progress bar */}
                        <ProgressBar
                          value={percentage}
                          color={isUserVote ? 'blue' : 'indigo'}
                          size="sm"
                        />
                      </div>
                    );
                  })}
                </div>

                {/* Footer Controls */}
                <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-3 text-slate-500">
                    <span>Total votes cast: <strong className="text-slate-900 font-mono">{poll.totalVotes}</strong></span>
                    <span>•</span>
                    <span className="text-emerald-600 font-medium">Tamper-Proof Ledger</span>
                  </div>

                  <div>
                    {hasVoted ? (
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>You Voted (Vote Locked)</span>
                      </div>
                    ) : (
                      <Button
                        variant="primary"
                        size="sm"
                        icon={Vote}
                        onClick={() => handleVoteSubmit(poll.id)}
                      >
                        Vote Now
                      </Button>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Completed Previous Votes Section */}
      <div className="space-y-4 pt-4">
        <div className="flex items-center gap-2">
          <Archive className="w-4 h-4 text-slate-400" />
          <h3 className="text-base font-bold text-slate-900">Previous Completed Votes ({completedPolls.length})</h3>
        </div>

        <div className="space-y-4">
          {completedPolls.map((poll) => {
            const sortedOptions = [...poll.options].sort((a, b) => b.votes - a.votes);
            const winner = sortedOptions[0];

            return (
              <Card key={poll.id} className="bg-slate-50/50 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant="neutral" size="sm">Completed</Badge>
                    <span className="text-xs font-mono text-slate-500">{poll.expiresAt}</span>
                  </div>
                  <Badge variant="success" size="sm" className="flex items-center gap-1">
                    <Award className="w-3.5 h-3.5" />
                    <span>Winner: {winner.label.split(' ')[0]} {winner.label.split(' ')[1]}</span>
                  </Badge>
                </div>

                <h4 className="text-sm font-bold text-slate-900">{poll.title}</h4>
                <p className="text-xs text-slate-600">{poll.description}</p>

                <div className="space-y-2 pt-2">
                  {poll.options.map((opt) => {
                    const pct = Math.round((opt.votes / poll.totalVotes) * 100);
                    const isWinner = opt.id === winner.id;
                    return (
                      <div key={opt.id} className="bg-white p-2.5 rounded-lg border border-slate-200 text-xs">
                        <div className="flex justify-between items-center mb-1">
                          <span className={`font-medium ${isWinner ? 'text-slate-900 font-bold' : 'text-slate-600'}`}>
                            {opt.label} {isWinner && '🏆'}
                          </span>
                          <span className="font-mono font-bold text-slate-800">{pct}% ({opt.votes})</span>
                        </div>
                        <ProgressBar value={pct} color={isWinner ? 'emerald' : 'indigo'} size="sm" />
                      </div>
                    );
                  })}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};
