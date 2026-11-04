'use client';

import ReactPaginate from 'react-paginate';
import { useQueryState, parseAsInteger } from 'nuqs';
import { SlArrowLeft, SlArrowRight } from 'react-icons/sl';

type Props = { pageCount?: number };

// ---------------------------

export function Pagination(props: Props) {
  const { pageCount } = props;
  const [page, setPage] = useQueryState('page', parseAsInteger.withDefault(1));

  if (!pageCount || pageCount <= 1) return null;

  return (
    <ReactPaginate
      forcePage={page - 1}
      pageCount={pageCount}
      onPageChange={({ selected }) => setPage(selected + 1)}
      containerClassName="flex flex-wrap mt-14 justify-center gap-x-2 gap-y-4 xl:justify-end"
      activeClassName="bg-[#333] text-white"
      pageClassName="w-9 h-9 flex-center cursor-pointer border overflow-hidden rounded-lg"
      pageLinkClassName="full-size text-[0.8rem] font-semibold pt-1 flex-center"
      disabledClassName="opacity-50"
      previousLabel={
        <button className="bg-zinc-200/40 w-9 h-9 ml-2 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200">
          <SlArrowRight size={12} />
        </button>
      }
      nextLabel={
        <button className="bg-zinc-200/40 w-9 h-9 mr-2 flex-center rounded-md transition-colors duration-200 ease-in-out hover:bg-zinc-200">
          <SlArrowLeft size={12} />
        </button>
      }
    />
  );
}
