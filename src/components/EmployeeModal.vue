<template>
  <div
    v-if="isOpen"
    class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
  >
    <div class="bg-white p-6 rounded-lg w-full max-w-md">
      <h2 class="text-xl font-bold mb-4">
        {{ isEdit ? 'Edit' : 'Add' }} {{ employeeType }}
      </h2>

      <form @submit.prevent="handleSubmit">
        <div class="mb-4">
          <label class="block mb-1">Name</label>
          <input
            v-model="form.name"
            type="text"
            class="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div class="mb-4">
          <label class="block mb-1">Department</label>
          <select
            v-model="form.department"
            class="w-full border rounded px-3 py-2"
            required
          >
            <option value="cardiology">Cardiology</option>
            <option value="surgery">Surgery</option>
          </select>
        </div>

        <div v-if="employeeType === 'Doctor'" class="mb-4">
          <label class="flex items-center">
            <input
              v-model="form.isHeadOfDepartment"
              type="checkbox"
              class="mr-2"
            />
            Head of Department
          </label>
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            @click="close"
            class="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            {{ isEdit ? 'Save' : 'Add' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import type { Doctor, Nurse, Employee, Department } from '@/types/employee';

const props = defineProps<{
  isOpen: boolean;
  employeeType: 'Doctor' | 'Nurse';
  employee?: Doctor | Nurse;
}>();

const emit = defineEmits<{
  (e: 'close'): void;
  (e: 'save', employee: Doctor | Nurse): void;
}>();

const isEdit = computed(() => !!props.employee);

const form = ref({
  name: '',
  department: 'cardiology' as Department,
  isHeadOfDepartment: false,
});

watch(
  () => props.employee,
  (newEmployee) => {
    if (newEmployee) {
      form.value = {
        ...newEmployee,
        isHeadOfDepartment:
          'isHeadOfDepartment' in newEmployee
            ? newEmployee.isHeadOfDepartment
            : false,
      };
    } else {
      form.value = {
        name: '',
        department: 'cardiology',
        isHeadOfDepartment: false,
      };
    }
  },
  { immediate: true }
);

const handleSubmit = () => {
  const baseEmployee: Employee = {
    id: props.employee?.id || crypto.randomUUID(),
    name: form.value.name,
    department: form.value.department,
  };

  const employee =
    props.employeeType === 'Doctor'
      ? { ...baseEmployee, isHeadOfDepartment: form.value.isHeadOfDepartment }
      : baseEmployee;

  emit('save', employee as Doctor | Nurse);
  close();
};

const close = () => {
  emit('close');
};
</script>
