import { CompleteTaskStore, CreateTaskStore, DeleteTaskStore, GetTasksStore } from "$houdini";
import { gqlError, gqlResponse } from "../helpers";

export async function readTasks() {
  try {
    const ret = await new GetTasksStore().fetch();
    return gqlResponse(ret, ret.data?.tasks);
  } catch (e) {
    return gqlError(e);
  }
}

export async function createTask(title: string, description: string) {
  try {
    const ret = await new CreateTaskStore().mutate({ title, description });
    // console.log({createRegion: ret})
    return gqlResponse(ret, ret.data?.addTask);
  } catch (e) {
    return gqlError(e);
  }
}

export async function completeTask(id: number) {
  try {
    const ret = await new CompleteTaskStore().mutate({ id });
    return gqlResponse(ret, ret.data?.completeTask);
  } catch (e) {
    return gqlError(e);
  }
}

export async function deleteTask(id: number) {
  try {
    const ret = await new DeleteTaskStore().mutate({ id });
    return gqlResponse(ret, ret.data?.deleteTask);
  } catch (e) {
    return gqlError(e);
  }
}
