import { ref } from "vue";

import { store } from "@temp/search-pro/store.js";

import { clientWorker, searchProOptions } from "../define.js";
import type {
  MessageData,
  QueryResult,
  SearchResult,
} from "../typings/index.js";

declare const __VUEPRESS_BASE__: string;
declare const __VUEPRESS_DEV__: boolean;

export interface SearchWorker {
  search: <T extends MessageData>(
    options: T,
  ) => Promise<
    T["type"] extends "search"
      ? SearchResult[]
      : T["type"] extends "suggest"
        ? string[]
        : QueryResult
  >;
  terminate: () => void;
}

const courseInfoList = ref<Array<string>>([]);

export const setCourseInfo = (courseInfo: Array<string>) =>
  (courseInfoList.value = courseInfo);

export const createSearchWorker = (): SearchWorker => {
  // Service worker with module only works on webkit browsers now, so we only used it in dev
  const worker = new Worker(
    __VUEPRESS_DEV__
      ? clientWorker
      : `${__VUEPRESS_BASE__}${searchProOptions.worker}`,
    __VUEPRESS_DEV__ ? { type: "module" } : {},
  );
  const queue: {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (args: any) => void;
    reject: (err: Error) => void;
  }[] = [];

  worker.addEventListener(
    "message",
    ({ data }: MessageEvent<SearchResult[]>) => {
      const { resolve } = queue.shift()!;
      let dataLen = data.length;

      for (let i = 0; i < dataLen; i) {
        let contentLen = data[i].contents.length;

        for (let j = 0; j < contentLen; j) {
          // 判断当前课程是否存在
          let isExisted = false;

          for (let k = 0; k < courseInfoList.value.length; k++)
            if (
              store[data[i].contents[j].id].indexOf(courseInfoList.value[k]) !==
              -1
            ) {
              isExisted = true;
              break;
            }

          // 不存在则删除data[i][j]
          if (!isExisted) data[i].contents.splice(j, 1);
          else j++;

          contentLen = data[i].contents.length;
        }
        if (contentLen === 0) data.splice(i, 1);
        else i++;

        dataLen = data.length;
      }
      resolve(data);
    },
  );

  return {
    search: <T extends MessageData>(
      options: T,
    ): Promise<
      T["type"] extends "search"
        ? SearchResult[]
        : T["type"] extends "suggest"
          ? string[]
          : QueryResult
    > =>
      new Promise((resolve, reject) => {
        worker.postMessage(options);
        queue.push({ resolve, reject });
      }),
    terminate: (): void => {
      worker.terminate();
      queue.forEach(({ reject }) =>
        reject(new Error("Worker has been terminated.")),
      );
    },
  };
};
