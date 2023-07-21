<template>
    <div class="container mx-auto max-w-md px-4 py-6 bg-2c3f50 shadow-lg rounded-lg my-3 text-white">
      <div class="mb-4">
        <h2 class="text-2xl font-bold mb-2">To-Do List</h2>
        <form @submit.prevent="addTask" class="flex mt-4">
          <input class="shadow appearance-none border rounded w-full py-2 px-3 mr-2 text-white bg-34495e" v-model="newTask" placeholder="Add a task">
          <button class="flex-no-shrink p-2 border-2 rounded text-teal bg-teal hover:text-2c3f50 hover:bg-teal" type="submit">
            Add
          </button>
        </form>
      </div>
      <div class="tasks-scrollable">
      <transition-group name="task">
        <div class="border-b border-34495e py-2 flex items-center justify-between" v-for="(task, index) in tasks" :key="task.title">
          <div class="flex items-center">
            <input type="checkbox" class="form-checkbox h-5 w-5 text-gray-500 rounded-full mr-4" v-on:click="completeTask(index)">
            <p class="w-full text-grey-darkest" :class="{ 'line-through': task.completed }">{{ task.title }}</p>
          </div>
          <button class="flex-no-shrink p-2 ml-2 border-2 rounded text-red bg-red hover:text-2c3f50 hover:bg-red" @click="deleteTask(index)">
            Delete
          </button>
        </div>
      </transition-group>
    </div>
      <div v-if="completedTasks.length > 0">
        <h2 class="text-2xl font-bold my-2">Completed Tasks</h2>
        <div class="border-b border-34495e py-2 line-through" v-for="(task, index) in completedTasks" :key="task">
          <p class="w-full text-grey-darkest">{{ task }}</p>
        </div>
      </div>
      <div v-if="showModal" class="fixed z-10 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
          <span class="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
          <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
            <div class="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <div class="sm:flex sm:items-start">
                <div class="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 class="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                    Uyarı
                  </h3>
                  <div class="mt-2">
                    <p class="text-sm text-gray-500">
                      Bu görev zaten listenizde var!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-700 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm" @click="showModal = false">
                Tamam
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const tasks = ref([]);
  const completedTasks = ref([]);
  const newTask = ref('');
  const showModal = ref(false);
  
  function addTask() {
    if (newTask.value !== '') {
      if (!tasks.value.some(task => task.title === newTask.value)) {
        tasks.value.push({ title: newTask.value, completed: false });
        newTask.value = '';
      } else {
        showModal.value = true;
      }
    }
  }
  
  function deleteTask(index) {
    completedTasks.value.push(tasks.value[index].title);
    tasks.value.splice(index, 1);
  }
  
  function completeTask(index) {
    tasks.value[index].completed = !tasks.value[index].completed;
  }
  </script>
  
  <style>
  .line-through {
    text-decoration: line-through;
  }
  
  .task-enter-active,
  .task-leave-active {
    transition: all 0.5s;
  }
  
  .task-enter-from,
  .task-leave-to {
    opacity: 0;
    transform: translateY(-10px);
  }
  .bg-2c3f50 {
  background-color: #2c3f50;
}

.bg-34495e {
  background-color: #34495e;
}

.border-34495e {
  border-color: #34495e;
}
.tasks-scrollable {
  max-height: 500px;  /* Bu değeri ihtiyacınıza göre ayarlayabilirsiniz */
  overflow-y: auto;
  margin-right: 1px;
  padding-right: 10px;
  background: #2c3f50;
}
/* Kaydırma çubuğunun genişliğini ve arka planını ayarlama */
.tasks-scrollable::-webkit-scrollbar {
  width: 10px; /* Çubuğun genişliği */
  background-color: #34495e; /* Çubuğun arka planı */
}

/* Kaydırıcıyı (tıklanabilir kısım) ayarlama */
.tasks-scrollable::-webkit-scrollbar-thumb {
  background-color: #34495e; /* Kaydırıcı rengi */
  border-radius: 10px; /* Kaydırıcının yuvarlak köşeleri */
}

/* Kaydırıcının üzerinde fare olduğunda */
.tasks-scrollable::-webkit-scrollbar-thumb:hover {
  background-color: #2c3f50; /* Kaydırıcının rengi */
}

  </style>