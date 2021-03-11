<template>
  <div class="main container">
    <h1>ToDo</h1>
    <h6>using Vue and firebase</h6>
    <form action="" @submit.prevent>
        <input type="text"
               v-model="todo.name"
               v-on:keypress.enter="inputHandler"
              >
    </form>
    <ul>
      <li class="col s12 up" v-for="tds in todosCollection" :key="tds">
        {{tds.name}}
        <a class="waves-effect waves-light btn-small right" @click="deleteHandler(tds.key)">Delete</a>
      </li>
    </ul>
  </div>
</template>

<script>
import { db } from './firebase'

export default {
  name: 'App',
  data(){
    return{
      todo: {
        _id: Date.now(),
        name: '',
        done: false
      },
      todosCollection: []
    }
  },
  mounted() {
    db.collection('todos').onSnapshot((snapshotChange)=>{
      this.todosCollection = []
      snapshotChange.forEach((doc)=>{
        this.todosCollection.push({
          key: doc.id,
          _id: doc.data()._id,
          name: doc.data().name,
          done: doc.data().done
        })
      })
    })
  },
  methods: {
    inputHandler(){
      db.collection('todos').add(this.todo)
          .then(()=>{console.log('success')})
          .catch((error)=>{console.error(error)})
      this.todo.name = ''
    },
    deleteHandler(id){
      db.collection('todos').doc(id).delete()
          .then(()=>{console.log('user has deleted')})
          .catch((error)=>{console.error(error)})
    }
  }
}
</script>

<style>
  .up{
    margin-bottom: 30px;
  }
</style>
