'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Search, Plus, Edit } from 'lucide-react';
import type { Student, StudentLevel } from '@/types';
import { studentLevelLabels } from '@/types';
import { addStudent, updateStudent } from '@/lib/storage';
import { generateReferralCode } from '@/lib/referral';
import { courses } from '@/data/courses';

interface StudentTableProps {
  students: Student[];
  onUpdate: () => void;
}

const levelColors: Record<StudentLevel, string> = {
  beginner: 'bg-amber-100 text-amber-800',
  intermediate: 'bg-teal-100 text-teal-800',
  advanced: 'bg-purple-100 text-purple-800',
  competition: 'bg-rose-100 text-rose-800',
};

export default function StudentTable({ students, onUpdate }: StudentTableProps) {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  // Form state
  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formParentName, setFormParentName] = useState('');
  const [formAge, setFormAge] = useState('');
  const [formLevel, setFormLevel] = useState<StudentLevel>('beginner');
  const [formCourses, setFormCourses] = useState<string[]>([]);

  const filteredStudents = students.filter((student) => {
    const matchesSearch =
      student.name.includes(search) ||
      student.phone.includes(search) ||
      (student.parentName && student.parentName.includes(search));
    const matchesLevel = levelFilter === 'all' || student.level === levelFilter;
    return matchesSearch && matchesLevel;
  });

  const resetForm = () => {
    setFormName('');
    setFormPhone('');
    setFormParentName('');
    setFormAge('');
    setFormLevel('beginner');
    setFormCourses([]);
    setEditingStudent(null);
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setFormName(student.name);
    setFormPhone(student.phone);
    setFormParentName(student.parentName || '');
    setFormAge(student.age.toString());
    setFormLevel(student.level);
    setFormCourses(student.enrolledCourses);
    setShowAddDialog(true);
  };

  const handleSave = () => {
    if (!formName.trim() || !formPhone.trim()) return;

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        name: formName,
        phone: formPhone,
        parentName: formParentName || undefined,
        age: parseInt(formAge) || 7,
        level: formLevel,
        enrolledCourses: formCourses,
      });
    } else {
      const newStudent: Student = {
        id: `stu-${Date.now()}`,
        name: formName,
        phone: formPhone,
        role: 'student',
        parentName: formParentName || undefined,
        age: parseInt(formAge) || 7,
        level: formLevel,
        enrolledCourses: formCourses,
        referralCode: generateReferralCode(),
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      addStudent(newStudent);
    }

    setShowAddDialog(false);
    resetForm();
    onUpdate();
  };

  const toggleCourse = (courseId: string) => {
    setFormCourses(prev =>
      prev.includes(courseId)
        ? prev.filter(id => id !== courseId)
        : [...prev, courseId]
    );
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('fa-IR');
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="جستجوی نام، شماره تماس..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pr-10"
          />
        </div>
        <Select value={levelFilter} onValueChange={setLevelFilter}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="سطح" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">همه سطوح</SelectItem>
            {Object.entries(studentLevelLabels).map(([key, label]) => (
              <SelectItem key={key} value={key}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button
          onClick={() => {
            resetForm();
            setShowAddDialog(true);
          }}
          className="bg-teal-600 hover:bg-teal-700 text-white"
        >
          <Plus className="w-4 h-4 ml-2" />
          افزودن کارآموز
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="text-right">نام</TableHead>
                <TableHead className="text-right">سن</TableHead>
                <TableHead className="text-right hidden md:table-cell">والدین</TableHead>
                <TableHead className="text-right">سطح</TableHead>
                <TableHead className="text-right hidden sm:table-cell">دوره‌ها</TableHead>
                <TableHead className="text-right hidden lg:table-cell">کد معرف</TableHead>
                <TableHead className="text-right hidden lg:table-cell">تاریخ ثبت‌نام</TableHead>
                <TableHead className="text-right">عملیات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    کارآموزی یافت نشد
                  </TableCell>
                </TableRow>
              ) : (
                filteredStudents.map((student) => (
                  <TableRow key={student.id} className="hover:bg-teal-50/50">
                    <TableCell>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-xs text-gray-500" dir="ltr">{student.phone}</p>
                      </div>
                    </TableCell>
                    <TableCell>{student.age} سال</TableCell>
                    <TableCell className="hidden md:table-cell">{student.parentName || '—'}</TableCell>
                    <TableCell>
                      <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${levelColors[student.level]}`}>
                        {studentLevelLabels[student.level]}
                      </span>
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {student.enrolledCourses.map(cId => {
                          const course = courses.find(c => c.id === cId);
                          return course ? (
                            <Badge key={cId} variant="outline" className="text-xs">
                              {course.title.replace('دوره ', '')}
                            </Badge>
                          ) : null;
                        })}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <code className="text-xs bg-gray-100 px-2 py-1 rounded" dir="ltr">
                        {student.referralCode}
                      </code>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-gray-500">
                      {formatDate(student.createdAt)}
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => openEditDialog(student)}
                        className="text-teal-600 hover:text-teal-700"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={showAddDialog} onOpenChange={(open) => {
        if (!open) resetForm();
        setShowAddDialog(open);
      }}>
        <DialogContent className="max-w-lg" dir="rtl">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? 'ویرایش کارآموز' : 'افزودن کارآموز جدید'}
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نام کارآموز *</label>
                <Input value={formName} onChange={(e) => setFormName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">شماره تماس *</label>
                <Input value={formPhone} onChange={(e) => setFormPhone(e.target.value)} dir="ltr" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">نام والدین</label>
                <Input value={formParentName} onChange={(e) => setFormParentName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">سن</label>
                <Input value={formAge} onChange={(e) => setFormAge(e.target.value)} type="number" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">سطح</label>
              <Select value={formLevel} onValueChange={(v) => setFormLevel(v as StudentLevel)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(studentLevelLabels).map(([key, label]) => (
                    <SelectItem key={key} value={key}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">دوره‌های ثبت‌نام شده</label>
              <div className="flex flex-wrap gap-2">
                {courses.map(course => (
                  <Button
                    key={course.id}
                    variant={formCourses.includes(course.id) ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => toggleCourse(course.id)}
                    className={
                      formCourses.includes(course.id)
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : ''
                    }
                  >
                    {course.title.replace('دوره ', '')}
                  </Button>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter className="flex gap-2">
            <Button
              onClick={handleSave}
              disabled={!formName.trim() || !formPhone.trim()}
              className="bg-teal-600 hover:bg-teal-700 text-white"
            >
              {editingStudent ? 'ذخیره تغییرات' : 'افزودن'}
            </Button>
            <Button variant="outline" onClick={() => {
              setShowAddDialog(false);
              resetForm();
            }}>
              انصراف
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
