#!/usr/bin/env python3
"""simple helper function"""
import typing


def index_range(page: int, page_size: int) -> typing.Tuple[int, int]:
    """Helper function"""
    start_index = (page - 1) * page_size
    end_index = page * page_size
    return (start_index, end_index)
