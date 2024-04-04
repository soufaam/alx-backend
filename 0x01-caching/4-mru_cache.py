#!/usr/bin/python3
"""class FIFO Cache that inherits from BaseCaching and is a caching system"""
from base_caching import BaseCaching


class MRUCache(BaseCaching):
    """Create a class LIFOCache"""
    leat_used = {}

    def __init__(self):
        """Constructor function"""
        super().__init__()

    def put(self, key, item):
        """Must assign to the dictionary
        self.cache_data the item value for the key key."""
        if key and item:
            self.cache_data[key] = item
            poped_key = None
            if len(self.cache_data.items()) > BaseCaching.MAX_ITEMS:
                for lkey, val in MRUCache.leat_used.items():
                    if max(MRUCache.leat_used.values()) == val:
                        poped_key = lkey
                        print("DISCARD: {}".format(poped_key))
                        self.cache_data.pop(poped_key)
                        break
                MRUCache.leat_used.pop(poped_key)
            if MRUCache.leat_used == {}:
                MRUCache.leat_used[key] = 0
            else:
                MRUCache.leat_used[key] = sum(MRUCache.leat_used.values()) + 1

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        if not key or key not in self.cache_data.keys():
            return None
        if key in MRUCache.leat_used.keys():
            MRUCache.leat_used[key] = sum(MRUCache.leat_used.values()) + 1
        return self.cache_data[key]
