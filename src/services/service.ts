import { CreateTaskStore, GetTasksStore } from "$houdini"
import { gqlError, gqlResponse } from "../helpers"

export async function readTasks() {
    try {
      const ret = await new GetTasksStore().fetch()
      return  gqlResponse(ret, ret.data?.tasks)
    } catch(e) {
      return gqlError(e)
    }
  }

  export async function createTask(title: string, description: string) {
    try {
      const ret = await new CreateTaskStore().mutate({ title, description })
      // console.log({createRegion: ret})
      return gqlResponse(ret, ret.data?.addTask)
    } catch (e) {
      return gqlError(e)
    }
  }