#!/usr/bin/python3
"""class FIFO Cache that inherits from BaseCaching and is a caching system"""
from base_caching import BaseCaching


class LFUCache(BaseCaching):
    """Create a class LIFOCache"""
    lfu_used = {}

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
                for lkey, val in LFUCache.lfu_used.items():
                    if min(LFUCache.lfu_used.values()) == val:
                        poped_key = lkey
                        print("DISCARD: {}".format(poped_key))
                        self.cache_data.pop(poped_key)
                        break
                LFUCache.lfu_used.pop(poped_key)
            if key not in LFUCache.lfu_used.keys():
                LFUCache.lfu_used[key] = 1
            else:
                LFUCache.lfu_used[key] += 1

    def get(self, key):
        """return the value in self.cache_data linked to key"""
        if not key or key not in self.cache_data.keys():
            return None
        if key in LFUCache.lfu_used.keys():
            LFUCache.lfu_used[key] += 1
        return self.cache_data[key]
