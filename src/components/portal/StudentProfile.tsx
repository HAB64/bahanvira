'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { User, Phone, Calendar, Award, Copy, Check } from 'lucide-react';
import type { Student } from '@/types';
import { studentLevelLabels } from '@/types';
import { generateReferralLink } from '@/lib/referral';
import { useState } from 'react';

interface StudentProfileProps {
  student: Student;
}

const levelColors: Record<string, string> = {
  beginner: 'bg-amber-100 text-amber-800',
  intermediate: 'bg-teal-100 text-teal-800',
  advanced: 'bg-purple-100 text-purple-800',
  competition: 'bg-rose-100 text-rose-800',
};

export default function StudentProfile({ student }: StudentProfileProps) {
  const [copied, setCopied] = useState(false);

  const referralLink = student.referralCode ? generateReferralLink(student.referralCode) : '';

  const handleCopy = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Profile Card */}
      <Card className="border-2 border-amber-200 overflow-hidden">
        <div className="bg-gradient-to-l from-amber-500 to-orange-500 p-6">
          <div className="flex items-center gap-4">
            <Avatar className="w-16 h-16 bg-white/20 border-2 border-white">
              <AvatarFallback className="bg-white/30 text-white text-xl font-bold">
                {student.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className="text-white">
              <h2 className="text-xl font-bold">{student.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <Badge className="bg-white/20 text-white border-0">
                  {studentLevelLabels[student.level]}
                </Badge>
                <span className="text-white/80 text-sm">{student.age} ساله</span>
              </div>
            </div>
          </div>
        </div>
        <CardContent className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-amber-50">
                <Phone className="w-4 h-4 text-amber-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">شماره تماس</p>
                <p className="font-medium" dir="ltr">{student.phone}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-50">
                <User className="w-4 h-4 text-teal-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">نام والدین</p>
                <p className="font-medium">{student.parentName || '—'}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Referral Card */}
      {student.referralCode && (
        <Card className="border-2 border-teal-200">
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <Award className="w-5 h-5 text-teal-600" />
              کد معرف شما
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-gray-600">
              با اشتراک‌گذاری این کد با دوستانتان، هر دو طرف تخفیف ویژه دریافت می‌کنید!
            </p>
            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">کد معرف:</span>
                <code className="text-lg font-bold text-amber-700 bg-amber-100 px-3 py-1 rounded-lg" dir="ltr">
                  {student.referralCode}
                </code>
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  readOnly
                  value={referralLink}
                  className="flex-1 text-xs bg-white border rounded-lg px-3 py-2 text-gray-600"
                  dir="ltr"
                />
                <Button
                  onClick={handleCopy}
                  size="sm"
                  className={copied ? 'bg-green-600 hover:bg-green-700 text-white' : 'bg-teal-600 hover:bg-teal-700 text-white'}
                >
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
            </div>
            <div className="bg-teal-50 rounded-xl p-4">
              <h4 className="font-medium text-teal-800 mb-2">🎁 جایزه معرفی:</h4>
              <ul className="text-sm text-teal-700 space-y-1">
                <li>• معرف: ۱۰٪ تخفیف شهریه</li>
                <li>• معرفی‌شده: ۱۰٪ تخفیف شهریه</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
