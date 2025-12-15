# summary_store.py
class SummaryStore:
    _summary = ""

    @classmethod
    def get_summary(cls):
        return cls._summary

    @classmethod
    def set_summary(cls, new_summary: str):
        cls._summary = new_summary
