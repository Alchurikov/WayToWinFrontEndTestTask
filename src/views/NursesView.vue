<template>
  <div>
    <div class="flex justify-between items-center mb-4">
      <h1 class="text-2xl font-bold">Nurses</h1>
      <button
        @click="openModal()"
        class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Add Nurse
      </button>
    </div>

    <div class="mb-4 flex gap-4">
      <select v-model="departmentFilter" class="border rounded px-3 py-2">
        <option value="all">All Departments</option>
        <option value="cardiology">Cardiology</option>
        <option value="surgery">Surgery</option>
      </select>

      <select v-model="sortField" class="border rounded px-3 py-2">
        <option value="name">Sort by Name</option>
        <option value="department">Sort by Department</option>
      </select>

      <button
        @click="sortDirection = sortDirection === 'asc' ? 'desc' : 'asc'"
        class="px-3 py-2 border rounded"
      >
        {{ sortDirection === 'asc' ? '↑' : '↓' }}
      </button>
    </div>

    <table class="min-w-full bg-white border border-gray-300">
      <thead>
        <tr>
          <th class="px-6 py-3 border-b text-left">Name</th>
          <th class="px-6 py-3 border-b text-left">Department</th>
          <th class="px-6 py-3 border-b text-left">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="nurse in filteredSortedNurses"
          :key="nurse.id"
          class="hover:bg-gray-50"
        >
          <td class="px-6 py-4 border-b">{{ nurse.name }}</td>
          <td class="px-6 py-4 border-b capitalize">{{ nurse.department }}</td>
          <td class="px-6 py-4 border-b">
            <div class="flex gap-2">
              <button
                @click="openModal(nurse)"
                class="text-blue-600 hover:text-blue-800"
              >
                Edit
              </button>
              <button
                @click="deleteNurse(nurse.id)"
                class="text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <EmployeeModal
      :is-open="isModalOpen"
      employee-type="Nurse"
      :employee="selectedNurse"
      @close="closeModal"
      @save="handleSave"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { Doctor, Nurse } from '@/types/employee';
import {
  filteredSortedNurses,
  addNurse,
  updateNurse,
  deleteNurse,
  sortField,
  sortDirection,
  departmentFilter,
} from '@/store/employees';
import EmployeeModal from '@/components/EmployeeModal.vue';

const isModalOpen = ref(false);
const selectedNurse = ref<Nurse | undefined>();

const openModal = (nurse?: Nurse) => {
  selectedNurse.value = nurse;
  isModalOpen.value = true;
};

const closeModal = () => {
  isModalOpen.value = false;
  selectedNurse.value = undefined;
};

const handleSave = (employee: Doctor | Nurse) => {
  if (!('isHeadOfDepartment' in employee)) {
    if (selectedNurse.value) {
      updateNurse(employee);
    } else {
      addNurse(employee);
    }
  }
};
</script>
