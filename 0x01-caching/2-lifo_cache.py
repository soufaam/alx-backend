#!/usr/bin/python3
"""class FIFO Cache that inherits from BaseCaching and is a caching system"""
from base_caching import BaseCaching


class LIFOCache(BaseCaching):
    """Create a class LIFOCache"""
    first_inserted = []

    def __init__(self):
        """Constructor function"""
        super().__init__()

    def put(self, key, item):
        """Must assign to the dictionary
        self.cache_data the item value for the key key."""
        if key and item:
            self.cache_data[key] = item
            if len(self.cache_data.items()) > BaseCaching.MAX_ITEMS:
                print("DISCARD: {}".format(LIFOCache.first_inserted[-1]))
                self.cache_data.pop(LIFOCache.first_inserted[-1])
                LIFOCache.first_inserted.pop(-1)
        LIFOCache.first_inserted.append(key)

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        if not key or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
