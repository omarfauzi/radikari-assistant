from database.repository import Repository

def assemble_context(user_division, user_query):
    # Ambil semua SOP terkait divisi user dari Postgres
    docs = Repository.get_knowledge_by_division(user_division)
    
    # Gabungkan dokumen menjadi satu string konteks
    context_text = "\n\n".join(docs)
    
    # Rakit Prompt untuk DeepSeek
    full_prompt = f"""
    Kamu adalah asisten HR Digital Radikari. 
    Gunakan dokumen SOP berikut untuk menjawab:
    ---
    {context_text}
    ---
    Pertanyaan User: {user_query}
    """
    return full_prompt