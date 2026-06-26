import { Video, useVideoConfig, staticFile } from "remotion";

interface AvatarVideoProps {
  urlAvatar: string;
  style?: React.CSSProperties;
}

/**
 * Reproduce el video del avatar generado por HeyGen o D-ID.
 * Si no hay URL, muestra un placeholder visual.
 */
export const AvatarVideo: React.FC<AvatarVideoProps> = ({ urlAvatar, style }) => {
  const { fps } = useVideoConfig();

  if (!urlAvatar) {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "linear-gradient(135deg, #e8e0f5 0%, #faf7ff 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 24,
          ...style,
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 64 }}>👤</div>
          <p style={{ fontFamily: "sans-serif", color: "#6b5b82", marginTop: 8 }}>
            Avatar aquí
          </p>
        </div>
      </div>
    );
  }

  return (
    <Video
      src={urlAvatar}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "cover",
        borderRadius: 24,
        ...style,
      }}
    />
  );
};
