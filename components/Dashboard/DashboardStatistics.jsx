import React from "react";
import {
  ClipboardListIcon,
  ClipboardCheckIcon,
  CheckCircleIcon,
  DotsCircleHorizontalIcon,
  PencilAltIcon,
  UserCircleIcon,
  TrashIcon,
} from "@heroicons/react/solid";

export default function DashboardStatistics({ all, mine, session }) {
  let mineCategory = 0;
  let mineDraft = 0; //Yellow
  let mineForApproval = 0; //Red
  let mineApproved = 0; //Green
  let minePublished = 0;
  let mineDeleted = 0;
  let draft = 0;
  let forApproval = 0;
  let approved = 0;
  let published = 0;

  mine?.articles.map((article) => {
    if (article.isDeleted) mineDeleted++;
    else {
      if (article.status == "draft") mineDraft++;
      if (article.status == "forApproval") mineForApproval++;
      if (article.status == "approved") mineApproved++;
      if (article.status == "published") minePublished++;
    }
  });

  all?.articles.map((article) => {
    if (session?.user.role == "Head") {
      if (article.category == session?.user.categories && !article.isDeleted) {
        mineCategory++;
        if (article.status == "draft") draft++;
        if (article.status == "forApproval") forApproval++;
        if (article.status == "approved") approved++;
        if (article.status == "published") published++;
      }
    }

    if (session?.user.role == "Editor-in-Chief") {
      if (!article.isDeleted) {
        if (article.status == "draft") draft++;
        if (article.status == "forApproval") forApproval++;
        if (article.status == "approved") approved++;
        if (article.status == "published") published++;
      }
    }
  });
  return (
    <div>
      <div className="items-center grid grid-cols-6">
        <div>
          <div className="stats font-mono">
            {session?.user.role == "Writer"
              ? mine
                ? mine?.articles.length
                : 0
              : session?.user.role == "Head"
              ? mineCategory
                ? mineCategory
                : 0
              : all
              ? all?.articles.length
              : 0}
          </div>
          <div className="stats-label rounded-l-xl">
            <ClipboardListIcon className="pointer-events-none w-4 h-4" />
            <div className="font-bold">All</div>
          </div>
        </div>

        <div>
          <div className="stats font-mono">
            {session?.user.role == "Writer"
              ? minePublished
                ? minePublished
                : 0
              : published
              ? published
              : 0}
          </div>
          <div className="stats-label ">
            <ClipboardCheckIcon className="pointer-events-none w-4 h-4" />
            <div className="font-bold">Published</div>
          </div>
        </div>

        <div>
          <div className="stats font-mono">
            {session?.user.role == "Writer"
              ? mineApproved
                ? mineApproved
                : 0
              : approved
              ? approved
              : 0}
          </div>
          <div className="stats-label ">
            <CheckCircleIcon className="pointer-events-none w-4 h-4" />
            <div className="font-bold">Approved</div>
          </div>
        </div>

        <div>
          <div className="stats font-mono">
            {session?.user.role == "Writer"
              ? mineForApproval
                ? mineForApproval
                : 0
              : forApproval
              ? forApproval
              : 0}
          </div>
          <div className="stats-label ">
            <DotsCircleHorizontalIcon className="pointer-events-none w-4 h-4" />
            <div className="font-bold">Pending</div>
          </div>
        </div>

        <div>
          <div className="stats font-mono">
            {session?.user.role == "Writer"
              ? mineDraft
                ? mineDraft
                : 0
              : draft
              ? draft
              : 0}
          </div>
          <div className="stats-label ">
            <PencilAltIcon className="pointer-events-none w-4 h-4" />
            <div className="font-bold">Drafts</div>
          </div>
        </div>

        <div>
          <div className="stats font-mono">
            {session?.user.role == "Writer"
              ? mineDeleted
                ? mineDeleted
                : 0
              : mine
              ? mine?.articles.length
              : 0}
          </div>
          <div className="stats-label rounded-r-xl">
            {session?.user.role == "Writer" ? (
              <TrashIcon className="pointer-events-none w-4 h-4" />
            ) : (
              <UserCircleIcon className="pointer-events-none w-4 h-4" />
            )}
            <div className="font-bold">
              {session?.user.role == "Writer" ? "Trash" : "Mine"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
