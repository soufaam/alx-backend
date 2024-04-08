#!/usr/bin/env python3
"""1-simple_pagination.py"""
import csv
import math
from typing import List, Tuple, Dict


def index_range(page: int, page_size: int) -> Tuple[int, int]:
    """Helper function"""
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)


class Server:
    """Server class to paginate a database of popular baby names.
    """
    DATA_FILE = "Popular_Baby_Names.csv"

    def __init__(self):
        self.__dataset = None

    def dataset(self) -> List[List]:
        """Cached dataset
        """
        if self.__dataset is None:
            with open(self.DATA_FILE) as f:
                reader = csv.reader(f)
                dataset = [row for row in reader]
            self.__dataset = dataset[1:]

        return self.__dataset

    def get_page(self, page: int = 1, page_size: int = 10) -> List[List]:
        """method named get_page that takes two integer arguments page with
        default value 1 and page_size """
        assert isinstance(page, int)
        assert isinstance(page_size, int)
        assert page > 0
        assert page_size > 0
        start_index, end_index = index_range(page=page, page_size=page_size)
        dataset = self.dataset()
        page_data = dataset[start_index:end_index]
        return page_data

    def get_hyper(self, page: int = 1, page_size: int = 10) -> Dict:
        """get_hyper method that takes the same
        arguments (and defaults) as get_page"""
        dictionnay = {}
        dictionnay['data'] = self.get_page(page, page_size)
        dictionnay['page'] = page
        dictionnay['page_size'] = page_size
        total_items = len(self.dataset())
        total_pages = (total_items + page_size - 1) // page_size
        dictionnay['total_pages'] = total_pages
        if page == 1:
            dictionnay['prev_page'] = None
        else:
            dictionnay['prev_page'] = page - 1
        if page < total_pages:
            dictionnay['next_page'] = page + 1
        else:
            dictionnay['next_page'] = None
        return dictionnay

    def get_hyper_index(index=None, page_size: int = 10) -> Dict:
        """get_hyper_index method with two integer arguments:
        index with a None default value and page_size 
        with default value of 10."""
        
