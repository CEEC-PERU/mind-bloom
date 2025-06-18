import { useEffect, useState } from 'react';
import { GetDocumentTypes, GetProfile } from '../../../../../services/profile.service';
import { DocumentType, Profile, ProfileResponse, UserInfo } from '../../../../../interfaces/UserInterfaces';


export const useProfile = (user_id: number) => {
    const [documentTypes, setDocumentTypes] = useState<DocumentType[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState<UserInfo | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const types = await GetDocumentTypes();
                setDocumentTypes(types);
                setLoading(false);
                const profile = await GetProfile(user_id, true) as UserInfo;
                setProfile(profile);
            } catch (error) {
                console.error('Error fetching document types:', error);
                setError(`${error}`);
                setLoading(false);
            }
        })();
    }, []);

    return { documentTypes, loading, error, profile };
};

