#!/usr/bin/python3
"""class FIFO Cache that inherits from BaseCaching and is a caching system"""
from base_caching import BaseCaching


class FIFOCache(BaseCaching):
    """Create a class FIFOCache"""
    first_inserted = []

    def __init__(self):
        """Constructor function"""
        super().__init__()

    def put(self, key, item):
        """Must assign to the dictionary
        self.cache_data the item value for the key key."""
        if key and item:
            FIFOCache.first_inserted.append(key)
            self.cache_data[key] = item
            if len(self.cache_data.items()) > BaseCaching.MAX_ITEMS:
                print("DISCARD: {}".format(FIFOCache.first_inserted[0]))
                self.cache_data.pop(FIFOCache.first_inserted[0])
                FIFOCache.first_inserted.pop(0)

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        if not key or key not in self.cache_data.keys():
            return None
        return self.cache_data[key]
