import { ref, computed } from 'vue';
import type { Doctor, Nurse, Department } from '@/types/employee';

export const doctors = ref<Doctor[]>([
  {
    id: '1',
    name: 'Dr. John Smith',
    department: 'cardiology',
    isHeadOfDepartment: true,
  },
  {
    id: '2',
    name: 'Dr. Sarah Johnson',
    department: 'surgery',
    isHeadOfDepartment: true,
  },
  {
    id: '3',
    name: 'Dr. Michael Brown',
    department: 'cardiology',
    isHeadOfDepartment: false,
  },
]);

export const nurses = ref<Nurse[]>([
  {
    id: '1',
    name: 'Emma Wilson',
    department: 'cardiology',
  },
  {
    id: '2',
    name: 'James Davis',
    department: 'surgery',
  },
]);

export const sortField = ref<'name' | 'department'>('name');
export const sortDirection = ref<'asc' | 'desc'>('asc');
export const departmentFilter = ref<Department | 'all'>('all');

export const addDoctor = (doctor: Doctor) => {
  doctors.value.push(doctor);
};

export const updateDoctor = (doctor: Doctor) => {
  const index = doctors.value.findIndex((d) => d.id === doctor.id);
  if (index !== -1) {
    doctors.value[index] = doctor;
  }
};

export const deleteDoctor = (id: string) => {
  doctors.value = doctors.value.filter((d) => d.id !== id);
};

export const addNurse = (nurse: Nurse) => {
  nurses.value.push(nurse);
};

export const updateNurse = (nurse: Nurse) => {
  const index = nurses.value.findIndex((n) => n.id === nurse.id);
  if (index !== -1) {
    nurses.value[index] = nurse;
  }
};

export const deleteNurse = (id: string) => {
  nurses.value = nurses.value.filter((n) => n.id !== id);
};

export const filteredSortedDoctors = computed(() => {
  let filtered = doctors.value;

  if (departmentFilter.value !== 'all') {
    filtered = filtered.filter((d) => d.department === departmentFilter.value);
  }

  return [...filtered].sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];
    const modifier = sortDirection.value === 'asc' ? 1 : -1;
    return aValue > bValue ? modifier : -modifier;
  });
});

export const filteredSortedNurses = computed(() => {
  let filtered = nurses.value;

  if (departmentFilter.value !== 'all') {
    filtered = filtered.filter((n) => n.department === departmentFilter.value);
  }

  return [...filtered].sort((a, b) => {
    const aValue = a[sortField.value];
    const bValue = b[sortField.value];
    const modifier = sortDirection.value === 'asc' ? 1 : -1;
    return aValue > bValue ? modifier : -modifier;
  });
});
