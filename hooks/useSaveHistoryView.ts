import { IEpisode, IHistoryView } from "@types";
import { useRouter } from "next/router";
import { useEffect } from "react";

const useSaveHistoryView = (data: IEpisode) => {
  const router = useRouter();
  const { id, category, episode } = router.query;
  useEffect(() => {
    const historyLocalStorage: IHistoryView[] = JSON.parse(localStorage.getItem("history") || "[]");
    const history = {
      id: data.id,
      name: data.name,
      coverVerticalUrl: data.coverVerticalUrl,
      coverHorizontalUrl: data.coverHorizontalUrl,
      episode: data.episode,
      episodeName: data.currentEpName,
    };
    const firstHistory = historyLocalStorage[0];
    if (!firstHistory) {
      localStorage.setItem("history", JSON.stringify([history]));
      return;
    }
    const isExist = firstHistory.id === data.id && firstHistory.episode === data.episode;
    if (isExist) return;
    localStorage.setItem("history", JSON.stringify([history, ...historyLocalStorage]));
  }, [id, category, episode]);
};

export default useSaveHistoryView;
