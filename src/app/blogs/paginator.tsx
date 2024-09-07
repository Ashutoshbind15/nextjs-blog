"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const Paginator = ({
  currentpage,
  totalpages,
}: {
  currentpage: number;
  totalpages: number;
}) => {
  const maxShownPagesTowardsEachSide = 2;
  const previousPages = currentpage - 1;
  const nextPages = totalpages - currentpage;

  const isLeftDotsVisible = previousPages > maxShownPagesTowardsEachSide;
  const isRightDotsVisible = nextPages > maxShownPagesTowardsEachSide;

  return (
    <Pagination>
      <PaginationContent>
        {currentpage > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`?page=${currentpage - 1}`} />
          </PaginationItem>
        )}

        {isLeftDotsVisible && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentpage - 2 > 0 && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentpage - 2}`}>
              {currentpage - 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentpage - 1 > 0 && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentpage - 1}`}>
              {currentpage - 1}
            </PaginationLink>
          </PaginationItem>
        )}

        <PaginationItem>
          <PaginationLink href={`?page=${currentpage}`} isActive>
            {currentpage}
          </PaginationLink>
        </PaginationItem>

        {currentpage + 1 <= totalpages && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentpage + 1}`}>
              {currentpage + 1}
            </PaginationLink>
          </PaginationItem>
        )}

        {currentpage + 2 <= totalpages && (
          <PaginationItem>
            <PaginationLink href={`?page=${currentpage + 2}`}>
              {currentpage + 2}
            </PaginationLink>
          </PaginationItem>
        )}

        {isRightDotsVisible && (
          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
        )}

        {currentpage < totalpages && (
          <PaginationItem>
            <PaginationNext href={`?page=${currentpage + 1}`} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
};

export default Paginator;
